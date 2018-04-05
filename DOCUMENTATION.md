## Modules

<dl>
<dt><a href="#module_normalizeArrayAndObject">normalizeArrayAndObject</a></dt>
<dd></dd>
<dt><a href="#module_utils">utils</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#Transaction">Transaction</a> ⇐ <code><a href="#PagSeguro">PagSeguro</a></code></dt>
<dd><p>class Transaction represent the transaction pagseguro api endpoint</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#PagSeguro">PagSeguro()</a></dt>
<dd><p>class PagSeguro represent the basic config of account</p>
</dd>
</dl>

<a name="module_normalizeArrayAndObject"></a>

## normalizeArrayAndObject
<a name="module_normalizeArrayAndObject..normalize"></a>

### normalizeArrayAndObject~normalize(data) ⇒ <code>Object</code>
normalize

**Kind**: inner method of [<code>normalizeArrayAndObject</code>](#module_normalizeArrayAndObject)  
**Returns**: <code>Object</code> - Object normalized,
exemple { number: [1], name: ['Jhon'] } returns { number: 1, name: 'Jhon' }  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | is an object to be normalized |

<a name="module_utils"></a>

## utils

* [utils](#module_utils)
    * [~typeOf(data)](#module_utils..typeOf) ⇒ <code>string</code>
    * [~parseXmlToObject(data, callback)](#module_utils..parseXmlToObject)
    * [~callback](#module_utils..callback) : <code>function</code>

<a name="module_utils..typeOf"></a>

### utils~typeOf(data) ⇒ <code>string</code>
typeOf

**Kind**: inner method of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - type of data  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | is a data for type verification |

<a name="module_utils..parseXmlToObject"></a>

### utils~parseXmlToObject(data, callback)
parseXmlToObject

**Kind**: inner method of [<code>utils</code>](#module_utils)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | xml for parse and transform in javascript object |
| callback | <code>callback</code> |  |

<a name="module_utils..callback"></a>

### utils~callback : <code>function</code>
this callback response an error and a result,
result is a xml transformed in Object

**Kind**: inner typedef of [<code>utils</code>](#module_utils)  

| Param | Type |
| --- | --- |
| err | <code>Error</code> | 
| res | <code>Object</code> | 

<a name="Transaction"></a>

## Transaction ⇐ [<code>PagSeguro</code>](#PagSeguro)
class Transaction represent the transaction pagseguro api endpoint

**Kind**: global variable  
**Extends**: [<code>PagSeguro</code>](#PagSeguro)  
<a name="PagSeguro"></a>

## PagSeguro()
class PagSeguro represent the basic config of account

**Kind**: global function  
