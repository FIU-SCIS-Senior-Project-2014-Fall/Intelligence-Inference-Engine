var type;
var prefixes;
var expressions;

var AbstractQueryGenerator = function  AbstractQueryGenerator()
{
	this.prefixes = new SimpleMap();
	this.expressions = new Array();
	
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
AbstractQueryGenerator.prototype.addPrefix = function(prefix) //make sure it is the same prefix object as the one the expression is using
{
	if(prefix instanceof Prefix)
		this.prefixes.put(prefix.getShortcode(), prefix);
	else
		throw "Incompatible type given for prefix";
}

AbstractQueryGenerator.prototype.buildQuery = function()
{
	//implement in child classes
}