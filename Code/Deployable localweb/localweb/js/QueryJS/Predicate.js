var prefix;
var verb;
var variable;


var Predicate = function Predicate(pref, v)
{
	this.prefix = pref;
	this.verb = v;
}
//Description : set prefix of predicate
//Input : a Prefix
//Output : N/A
//Pre-Condition : prefix given is valid 
//Post-Condition : prefix is set to given value
Predicate.prototype.setPrefix = function(pref)
{
	this.prefix = pref;
}
//Description : set vdrb
//Input : a verb
//Output : N/A
//Pre-Condition : verb given is valid 
//Post-Condition : verb is set to given value
Predicate.prototype.setVerb = function(v)
{
	this.verb = v;
}
//Description : returns a valid SPARQL predicate
//Input : N/A
//Output : a string
//Pre-Condition : prefix and verb are valid / not null
//Post-Condition : the string returned is valid SPARQL
Predicate.prototype.getPredicate = function()
{
	if(this.verb == null && this.prefix == null)
		return this.getVariable();
	return (this.prefix.shortcode + ":" + this.verb);
}
//Description : returns a valid SPARQL variable
//Input : n/a
//Output : a string
//Pre-Condition : variable must be null
//Post-Condition : variable is set to a value
Predicate.prototype.getVariable = function()
{
	if(this.variable == null)
		this.variable = "?"+this.hash();
	return this.variable;
}
//Description : a hashing function
//Input : N/A
//Output : returns either a random number or the hash of the verb and prefix
//Pre-Condition : N/A
//Post-Condition : the value returned is a positive number
Predicate.prototype.hash = function()
{
	var hash = 0;
	
	
	
	if(this.verb == null && this.prefix == null)
	{
		return Math.floor((Math.random() * 2000000000) + 1); //number should be sufficantly large enough to avoid collisions
	}

	var str = verb + "" + prefix.uri;
		
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}