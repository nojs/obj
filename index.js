
var O={
  clone:function(o){
    return o?(o.__proto__=this,o):
      {__proto__:this}},
  extend:function(o){
    return __extend(this,o)},
  new:function(o){
    return  ((typeof this.init)==="function"?
       (o=this.clone(o),this.init.apply(o,arguments),o):
       (this.clone(o)))}}

function __kind(o){
  var t=typeof o;
  if(t === "object"){
    if(o === null){
      return "atom"}
    else if(typeof o.length === "number"){
      return "list"}
    else{
      return "dict"}}
  else{
    return "atom"}}

function __extend(c,e){
  "override or extend someone's clone() properties with argument's"
  "c is assumed to be a newly created clone"
  "the only merged type is dict"
  "lists are treated as if they were atoms"
  __assert(__kind(c)==="dict"
           && __kind(e)==="dict")
  for(var k in e){
    var ck=c[k],ek=e[k];
    c[k]=((__kind(ek)==="dict" &&
           __kind(ck)==="dict")?
          (__extend({__proto__:ck},ek)):(ek))}
  return c}

function __assert(t,m){
  if(!t) throw new Error("assertion failed: "+m)}

var _smoke={
  do_extend:function(dbg){
    var t=O.clone({
      a:"aaaa",
      b:[1,2,3,4],
      d:{
        a:"aaaa",
        b:"bbbb"}
    }).extend({
      b:[4,5,6],
      d:{
        c:"cccc"}})
    if(dbg) debugger;
    __assert(t.d.a==="aaaa"
             && t.d.c==="cccc")
    return t},
  do_new:function(dbg){
    var t=_smoke.do_extend();
    var t1=t.clone().extend({
      d:{e:null},
      init:function(){
        this.d.e="it's dynamic"}});
    var t2=t1.new();
    __assert(t.d.e!=="it's dynamic"
             && t2.d.e==="it's dynamic");
    return t2}
}

module.exports={
  O:O,
  __kind:__kind,
  __extend:__extend,
  _smoke:_smoke
}

