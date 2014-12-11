var uri;
var literal;
var isLiteral; // boolean saying if it is a literal or not
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
//Description : a function that returns the appropriate value of the object
//Input : n/a
//Output : a valid SPARQL string
//Pre-Condition : N/A
//Post-Condition : the string returned is valid SPARQL
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
//Description : returns uri
//Input : n/a
//Output : a string
//Pre-Condition : uri is not null
//Post-Condition : the value returned is the uri of the object
rdfObject.prototype.getUri = function()
{
	//error checking
	if(this.uri.charAt(0) != "<")
		this.uri = "<" + this.uri;
	if(this.uri.charAt(this.uri.length-1) != ">")
		this.uri += ">";
	return this.uri;
}
//Description : returns a valid SPARQL literal
//Input : n/a
//Output : a string
//Pre-Condition : literal is not null
//Post-Condition : the string returned is a valid SPARQL literal
rdfObject.prototype.getLiteral = function()
{
	//error checking
	if(this.literal.charAt(0) != "\"")
		this.literal = "\"" + this.literal;
	if(this.literal.charAt(this.literal.length-1) != "\"")
		this.literal += "\"";
	return this.literal ;
}
//Description : sets the uri of the object
//Input : a string
//Output : n/a
//Pre-Condition : the string given is a valid sparql object uri 
//Post-Condition : the uri is set to the value given and isLiteral is made false
rdfObject.prototype.setUri = function(uri)
{
	this.uri = uri;
	this.isLiteral = false;
}
//Description : set the literal of the object
//Input : a string
//Output : n/a
//Pre-Condition : the sring given is a valid sparql literal 
//Post-Condition : the literal is set to the value given and isLiteral is made true
rdfObject.prototype.setLiteral = function(lit)
{
	this.literal = lit;
	this.isLiteral = true;
}
//Description : returns if the object is a literal
//Input : n/a
//Output : boolean
//Pre-Condition : isLiteral is not null and only set functions were used to set the variables
//Post-Condition : the value return correctly says if the object is a literal or not
rdfObject.prototype.isLit = function()
{
	return this.isLiteral;
}
//Description : returns a valid SPARQL variable
//Input : n/a
//Output : a string
//Pre-Condition : variable must be null
//Post-Condition : variable is set to a value
rdfObject.prototype.getVariable = function()
{
	if(this.variable == null)
		this.variable = "?"+this.hash();
	return this.variable;
}
//Description : a hashing function
//Input : N/A
//Output : returns either a random number or the hash of the literal or uri
//Pre-Condition : N/A
//Post-Condition : the value returned is a positive number
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

