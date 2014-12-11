//Driver to test the UpdateQueryGenerator and all classes included in it
var p = new Prefix("iie", "</fake/iie/types/>")
var sub = new rdfObject("<asd>")
var pred = new Predicate(p, "related")
var obj = new rdfObject("android", true)
var e = new Expression(sub, pred, obj)
var abs =  new UpdateQueryGenerator()
abs.addPrefix(p)
abs.addExpression(e)
abs.getQuery()