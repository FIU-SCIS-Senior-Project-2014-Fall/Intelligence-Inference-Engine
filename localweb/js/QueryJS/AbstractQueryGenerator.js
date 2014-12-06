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
	query += "SELECT * {";
	for(var i = 0; i < this.expressions.length;i++)
	{
		tempexp = this.expressions[i].getExpression();
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