var subject; // the subject of the expression, type is rdfObject
var pred; // the predicate of the expression, type is Predicate
var obj; // the object of the expression, type is rdfObject

var Expression = function Expression(s, p, o)
{
	this.subject = s;
	this.pred = p;
	this.obj = o;
}
//Description : set the subject
//Input : an rdfObject
//Output : N/A
//Pre-Condition : input is valid rdfObject
//Post-Condition : subject is set to the rdfObject given
Expression.prototype.setSubject = function(sub)
{
	if(sub instanceof Subject)
	{
		this.subject = sub;
	}
}
//Description : set the predicate of the expression
//Input : a Predicate object
//Output : N/A
//Pre-Condition : the input is a valid Predicate
//Post-Condition : the predicate is set to the Predicate given
Expression.prototype.setPredicate = function(pred)
{
	if(pred instanceof Predicate)
	{
		this.pred = pred;
	}
}
//Description : set the object
//Input : an rdfObject
//Output : N/A
//Pre-Condition : input is valid rdfObject
//Post-Condition : object is set to the rdfObject given
Expression.prototype.setObject = function(obj)
{
	if(obj instanceof rdfObject)
	{
		this.obj = obj;
	}
}
//Description : create a valid SPARQL expression
//Input : N/A
//Output : a string
//Pre-Condition : subject, predicate, and object are not null / subject cannot be a literal
//Post-Condition : a valid SPARQL expression is returned
Expression.prototype.buildExpression = function()
{
	if(this.subject.isLit())
	{
		console.log("Subject cannot be a literal, returning null")
		return null;
	}
	return (this.subject.getValue() + " " + this.pred.getPredicate() + " " + this.obj.getValue());
}
//Description : returns a valid SPARQL expression 
//Input : boolean that determines whether to include the subject in the expression
//Output : a string
//Pre-Condition : a boolean is given
//Post-Condition : returned the appropriate expression
Expression.prototype.getExpression = function(withsubject)
{
	if(withsubject)
		return this.buildExpression();
	else
		return this.buildExpressionNoSubject();
}
//Description : create a valid SPARQL expression
//Input : N/A
//Output : a string
//Pre-Condition : subject, predicate, and object are not null
//Post-Condition : a valid SPARQL expression is returned
Expression.prototype.buildExpressionNoSubject = function()
{
	if(this.subject.isLit())
	{
		console.log("Subject cannot be a literal, returning null")
		return null;
	}
	return (this.pred.getPredicate() + " " + this.obj.getValue());
}