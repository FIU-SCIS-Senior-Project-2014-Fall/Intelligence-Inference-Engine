var prefix;
var verb;
var variable;


var Predicate = function Predicate(pref, v)
{
	this.prefix = pref;
	this.verb = v;
}

Predicate.prototype.setPrefix = function(pref)
{
	this.prefix = pref;
}
Predicate.prototype.setVerb = function(v)
{
	this.verb = v;
}
Predicate.prototype.getPredicate = function()
{
	if(this.verb == null && this.prefix == null)
		return this.getVariable();
	return (this.prefix.shortcode + ":" + this.verb);
}
Predicate.prototype.getVariable = function()
{
	if(this.variable == null)
		this.variable = "?"+this.hash();
	return this.variable;
}
Predicate.prototype.hash = function()
{
	var hash = 0;
	
	
	
	if(this.verb == null && this.prefix == null)
	{
		return Math.floor((Math.random() * 2000000000) + 1); //number should be sufficantly large enough to avoid collisions
	}

	var str = verb + "" + uri;
		
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}