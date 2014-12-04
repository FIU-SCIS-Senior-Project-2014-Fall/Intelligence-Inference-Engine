var type;
var subject
var prefixes;
var expressions;

var AbstractQueryGenerator = function  AbstractQueryGenerator()
{
	prefixes = new SimpleMap();
	expressions = new Array();
}

AbstractQueryGenerator.prototype.setSubject = function(subj)
{
	if(subj instanceof rdfObject)
		this.subject = subj;
	else
		throw "Incompatible type given for subject";
}
AbstractQueryGenerator.prototype.setType = function(type)
{
	if(QueryType[type] != null)
		this.type = type
	else
		throw "Incompatible type given for type";
}
AbstractQueryGenerator.prototype.addExpression = function(exp)
{
	if(exp instanceof Expression)
		this.expressions.push(exp);
	else
		throw "Incompatible type given for expression";
}
AbstractQueryGenerator.prototype.addPrefix = function(prefix)
{
	if(exp instanceof Prefix)
		this.prefixes.put(prefix.getShortcode(), prefix);
	else
		throw "Incompatible type given for prefix";
}