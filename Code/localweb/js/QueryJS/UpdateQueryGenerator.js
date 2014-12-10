var type;
var prefixes;
var expressions;

var UpdateQueryGenerator = function  UpdateQueryGenerator()
{
	this.prefixes = new SimpleMap();
	this.expressions = new Array();
	
}
UpdateQueryGenerator.prototype.setType = function(type)
{
	if(QueryType[type] != null)
		this.type = type
	else
		throw "Incompatible type given for type";
}
UpdateQueryGenerator.prototype.addExpression = function(exp)
{
	if(exp instanceof Expression)
		this.expressions.push(exp);
	else
		throw "Incompatible type given for expression";
}
UpdateQueryGenerator.prototype.addPrefix = function(prefix) //make sure it is the same prefix object as the one the expression is using
{
	if(prefix instanceof Prefix)
		this.prefixes.put(prefix.getShortcode(), prefix);
	else
		throw "Incompatible type given for prefix";
}

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
UpdateQueryGenerator.prototype.getQuery = function()
{
	return this.buildQuery();
}