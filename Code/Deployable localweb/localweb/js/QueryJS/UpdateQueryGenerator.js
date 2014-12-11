var type;
var prefixes;
var expressions;

var UpdateQueryGenerator = function  UpdateQueryGenerator()
{
	this.prefixes = new SimpleMap();
	this.expressions = new Array();
	
}
//Description : sets the type of the generator
//Input : QueryType enum value
//Output : N/A
//Pre-Condition : QueryJS library must be loaded
//Post-Condition : The type of the generator isset to the type supplied
UpdateQueryGenerator.prototype.setType = function(type)
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
UpdateQueryGenerator.prototype.addExpression = function(exp)
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
UpdateQueryGenerator.prototype.addPrefix = function(prefix) //make sure it is the same prefix object as the one the expression is using
{
	if(prefix instanceof Prefix)
		this.prefixes.put(prefix.getShortcode(), prefix);
	else
		throw "Incompatible type given for prefix";
}
//Description : creates a valid update SPARQL query
//Input : n/a
//Output : a string
//Pre-Condition : prefixes and expressions are not null or expressions is not empty
//Post-Condition : the string returned is a valid SPARQL update query
UpdateQueryGenerator.prototype.buildQuery = function()
{
	if(this.prefixes == null)
	{
		throw "prefixes cannot be null";
		return null;
	}
	if(this.expressions == null || this.expressions.length == 0)
	{
		throw "expressions cannot be null or empty";
		return null;
	}

	
	var query = "";
	for(var p in this.prefixes.getAll())
	{
		temppref = this.prefixes.get(p).getFullPrefix();
		if (temppref != null)
			query += "PREFIX " + temppref + "\n";
	}
	query += "INSERT DATA{";
	for(var i = 0; i < this.expressions.length;i++)
	{
		var includesubj = false;
		if(i == 0)
			includesubj = true
			
		var tempexp = this.expressions[i].getExpression(includesubj);
		
		if (tempexp != null)
			query += tempexp;
		if (i < this.expressions.length - 1)
			query += ";\n";
		else
			query += ".\n";
	}
	query += "}";
	
	return query;
}
//Description : returns a valid SPARQL update query
//Input : N/A
//Output : a string that is a SPARQL query
//Pre-Condition : buildQuery has been implemented
//Post-Condition : a valid SPARQL update query is returned
UpdateQueryGenerator.prototype.getQuery = function()
{
	return this.buildQuery();
}