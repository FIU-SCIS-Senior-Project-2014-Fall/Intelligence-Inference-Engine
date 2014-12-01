var uri;
var literal;
var isLiteral;

var rdfObject = function rdfObject(data, isl)
{
	if(isl === undefined || isl == false)
	{
		this.uri = data;
		this.isLiteral = false;
	}
	else
	{
		this.literal = data;
		this.isLiteral = true;
	}
	
}

rdfObject.prototype.getValue = function()
{
	if(this.isLiteral)
	{
		return this.getLiteral();
	}
	else
	{
		return this.getUri();
	}
}
rdfObject.prototype.getUri = function()
{
	//error checking
	return this.uri;
}
rdfObject.prototype.getLiteral = function()
{
	//error checking
	return this.literal;
}
rdfObject.prototype.setUri = function(uri)
{
	this.uri = uri;
	this.isLiteral = false;
}
rdfObject.prototype.setLiteral = function(lit)
{
	this.literal = lit;
	this.isLiteral = true;
}
rdfObject.prototype.isLit = function()
{
	return isLiteral;
}
rdfObject.prototype.getVariable = function()
{
	return "?"+this.hash();
}
rdfObject.prototype.hash = function()
{
	var hash = 0;
	var str = "";
	if (this.isLiteral)
	{
		str = this.literal;
	}
	else
	{
		str = this.uri;
	}

		
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

