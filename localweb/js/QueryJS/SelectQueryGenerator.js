SelectQueryGenerator.prototype.buildQuery = function()
{
	if(prefixes == null)
	{
		throw "prefixes cannot be null";
		return null;
	}
	if(expressions == null || expressions.length == 0)
	{
		throw "expressions cannot be null or empty";
		return null;
	}
	if(subject == null)
	{
		throw "Subject cannot be null";
		return null;
	}
	
	var query = "";
	for(var p in prefixes)
	{
		temppref = prefixes[p].getFullPrefix();
		if (temppref != null)
			query += temppref + "\n";
	}
	query += "SELECT * {";
	for(var e in expressions)
	{
		tempexp = expressions[e].getExpression();
	}
}
SelectQueryGenerator.prototype.getQuery = function()
{
	return this.buildQuery();
}