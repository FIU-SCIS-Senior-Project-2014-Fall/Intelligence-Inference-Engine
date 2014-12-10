var uri;
var shortcode;


var Prefix = function Prefix(shortcode, uri)
{
	this.uri = uri;
	this.shortcode = shortcode;
}

Prefix.prototype.getUri = function()
{
	return this.uri;
}
Prefix.prototype.setUri = function(uri)
{
	this.uri = uri;
}
Prefix.prototype.getShortcode = function()
{
	return this.shortcode;
}
Prefix.prototype.setShortcode = function(sc)
{
	this.shortcode = sc;
}

Prefix.prototype.buildFullPrefix = function()
{
	if(this.shortcode === null || this.shortcode == "" ) 
	{
		throw "shortcode is null or empty";
		return null;
	}
	if (this.uri === null || this.uri == "")
	{
		throw "uri is null or empty";
		return null;
	}
	//more error checking code
	
	return this.shortcode + ":" + this.uri;
}

Prefix.prototype.getFullPrefix = function()
{
	return this.buildFullPrefix();
}

