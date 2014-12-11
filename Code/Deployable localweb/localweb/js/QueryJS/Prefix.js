var uri;
var shortcode;


var Prefix = function Prefix(shortcode, uri)
{
	this.uri = uri;
	this.shortcode = shortcode;
}

//Description : get the current uri value of the prefix
//Input : n/a
//Output : the current uri value of the prefix
//Pre-Condition : the current uri is not null
//Post-Condition : the returned value is not null
Prefix.prototype.getUri = function()
{
	return this.uri;
}
//Description : set the current uri value of the prefix
//Input : a string that is an uri
//Output : N/A
//Pre-Condition : The value given is not null 
//Post-Condition : the uri value of the current prefix is set to the value supplied
Prefix.prototype.setUri = function(uri)
{
	this.uri = uri;
}
//Description : get the current short code value of the prefix
//Input : n/a
//Output : the current short code value of the prefix
//Pre-Condition : the current short code is not null
//Post-Condition : the returned value is not null
Prefix.prototype.getShortcode = function()
{
	return this.shortcode;
}
//Description : set the current short code value of the prefix
//Input : a string that is a short code
//Output : N/A
//Pre-Condition : The value given is not null 
//Post-Condition : the short code value of the current prefix is set to the value supplied
Prefix.prototype.setShortcode = function(sc)
{
	this.shortcode = sc;
}

//Description : creates a valid SPARQL prefix 
//Input :  N/A
//Output : a valid SPARQL prefix string
//Pre-Condition : uri and short code are not null and SPARQL compliant
//Post-Condition : the string returned is valid SPARQL
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
//Description : A public warpper for buildFullPrefix
//Input : N/A
//Output : a valid SPARQL prefix string
//Pre-Condition : uri and short code are not null and SPARQL compliant
//Post-Condition : the string returned is valid SPARQL
Prefix.prototype.getFullPrefix = function()
{
	return this.buildFullPrefix();
}

