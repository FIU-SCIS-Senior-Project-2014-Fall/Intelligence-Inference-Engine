var prefix;
var verb;


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
	return (this.prefix.shortcode + ":" + this.verb);
}