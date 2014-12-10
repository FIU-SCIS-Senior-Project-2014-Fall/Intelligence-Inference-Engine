var uri;
var literal;
var isLiteral;
var variable;

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

rdfObject.prototype.getValue = function()								 // recommended way to get that the rdfObject looks like for the query
{
	if(this.uri == null && this.literal == null)
	{
		return this.getVariable();
	}
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
	if(this.uri.charAt(0) != "<")
		this.uri = "<" + this.uri;
	if(this.uri.charAt(this.uri.length-1) != ">")
		this.uri += ">";
	return this.uri;
}
rdfObject.prototype.getLiteral = function()
{
	//error checking
	if(this.literal.charAt(0) != "\"")
		this.literal = "\"" + this.literal;
	if(this.literal.charAt(this.literal.length-1) != "\"")
		this.literal += "\"";
	return this.literal ;
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
	return this.isLiteral;
}
rdfObject.prototype.getVariable = function()
{
	if(this.variable == null)
		this.variable = "?"+this.hash();
	return this.variable;
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
	
	if(str == null)
	{
		return Math.floor((Math.random() * 2000000000) + 1); //number should be sufficantly large enough to avoid collisions
	}

		
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

