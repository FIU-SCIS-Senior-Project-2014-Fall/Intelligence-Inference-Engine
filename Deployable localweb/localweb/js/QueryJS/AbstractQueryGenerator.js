var type; //the type of the generator, is QueryType enum value
var prefixes;// an array of Prefix objects
var expressions;// an array of Expression objects

var AbstractQueryGenerator = function  AbstractQueryGenerator()
{
	this.prefixes = new SimpleMap();
	this.expressions = new Array();
	
}
//Description : sets the type of the generator
//Input : QueryType enum value
//Output : N/A
//Pre-Condition : QueryJS library must be loaded
//Post-Condition : The type of the generator isset to the type supplied
AbstractQueryGenerator.prototype.setType = function(type)
{
	if(QueryType[type] != null)
		this.type = type
	else
		throw "Incompatible type given for type";
}
//Description : add an expression object to the list of expressions of the generator
//Input : an Expression object
//Output : N/A
//Pre-Condition : QueryJS library must be loaded
//Post-Condition : expression is added to the generator
AbstractQueryGenerator.prototype.addExpression = function(exp)
{
	if(exp instanceof Expression)
		this.expressions.push(exp);
	else
		throw "Incompatible type given for expression";
}
//Description : add a Prefix object to the list of prefixes of the generator
//Input : a Prefix object
//Output : N/A
//Pre-Condition : QueryJS library must be loaded
//Post-Condition : prefix is added to the generator
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
//Description : returns a valid SPARQL query
//Input : N/A
//Output : a string that is a SPARQL query
//Pre-Condition : buildQuery has been implemented
//Post-Condition : a valid SPARQL query is returned
AbstractQueryGenerator.prototype.getQuery = function()
{
	return this.buildQuery();
}