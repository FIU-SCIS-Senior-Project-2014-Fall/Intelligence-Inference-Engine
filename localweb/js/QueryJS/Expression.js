var subject;
var pred;
var obj;

var Expression = function Expression(s, p, o)
{
	this.subject = s;
	this.pred = p;
	this.obj = o;
}

Expression.prototype.setSubject = function(sub)
{
	if(sub instanceof Subject)
	{
		this.subject = sub;
	}
}
Expression.prototype.setPredicate = function(pred)
{
	if(pred instanceof Predicate)
	{
		this.pred = pred;
	}
}
Expression.prototype.setObject = function(obj)
{
	if(obj instanceof rdfObject)
	{
		this.obj = obj;
	}
}
Expression.prototype.buildExpression = function()
{
	return (this.subject.getUri() + " " + this.pred.getPredicate() + " " + this.obj.getValue());
}
Expression.prototype.getExpression = function()
{
	return this.buildExpression();
}