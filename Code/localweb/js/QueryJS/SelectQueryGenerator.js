var type;
var prefixes;
var expressions;

var SelectQueryGenerator = function  SelectQueryGenerator()
{
	this.prefixes = new SimpleMap();
	this.expressions = new Array();
	
}
SelectQueryGenerator.prototype.setType = function(type)
{
	if(QueryType[type] != null)
		this.type = type
	else
		throw "Incompatible type given for type";
}
SelectQueryGenerator.prototype.addExpression = function(exp)
{
	if(exp instanceof Expression)
		this.expressions.push(exp);
	else
		throw "Incompatible type given for expression";
}
SelectQueryGenerator.prototype.addPrefix = function(prefix) //make sure it is the same prefix object as the one the expression is using
{
	if(prefix instanceof Prefix)
		this.prefixes.put(prefix.getShortcode(), prefix);
	else
		throw "Incompatible type given for prefix";
}

SelectQueryGenerator.prototype.buildQuery = function()
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
		var temppref = this.prefixes.get(p).getFullPrefix();
		if (temppref != null)
			query += "PREFIX " + temppref + "\n";
	}
	query += "SELECT * {";
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
SelectQueryGenerator.prototype.getQuery = function()
{
	return this.buildQuery();
}