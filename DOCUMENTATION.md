## Modules

<dl>
<dt><a href="#module_normalizeArrayAndObject">normalizeArrayAndObject</a></dt>
<dd></dd>
<dt><a href="#module_utils">utils</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#PagSeguro">PagSeguro</a></dt>
<dd><p>class PagSeguro represent the basic config of account</p>
</dd>
<dt><a href="#Transaction">Transaction</a> ⇐ <code><a href="#PagSeguro">PagSeguro</a></code></dt>
<dd><p>class Transaction represent the transaction pagseguro api endpoint</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#item">item</a> : <code>Object</code></dt>
<dd></dd>
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

<a name="PagSeguro"></a>

## PagSeguro
class PagSeguro represent the basic config of account

**Kind**: global class  
<a name="new_PagSeguro_new"></a>

### new PagSeguro(email, token, [url])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| email | <code>string</code> |  | is email of account pagseguro, exemple vendor@email |
| token | <code>string</code> |  | is token of account pagseguro, get the token in pagseguro configuration |
| [url] | <code>string</code> | <code>&quot;sandbox&quot;</code> | is a type of url api, exemple 'sandbox' or 'production' |

<a name="Transaction"></a>

## Transaction ⇐ [<code>PagSeguro</code>](#PagSeguro)
class Transaction represent the transaction pagseguro api endpoint

**Kind**: global class  
**Extends**: [<code>PagSeguro</code>](#PagSeguro)  

* [Transaction](#Transaction) ⇐ [<code>PagSeguro</code>](#PagSeguro)
    * [new Transaction(email, token, [url])](#new_Transaction_new)
    * [.setUrlVersion([v])](#Transaction+setUrlVersion)
    * [.setModeUrl([mode])](#Transaction+setModeUrl)
    * [.getSession()](#Transaction+getSession) ⇒ <code>Promise</code>
    * [.addItem(item)](#Transaction+addItem)
    * [.setItems(items)](#Transaction+setItems)
    * [.setSender(sender)](#Transaction+setSender)
    * [.setShipping(shipping)](#Transaction+setShipping)
    * [.setReference(reference)](#Transaction+setReference)
    * [.setCurrency(currency)](#Transaction+setCurrency)
    * [.setNotificationUrl(url)](#Transaction+setNotificationUrl)

<a name="new_Transaction_new"></a>

### new Transaction(email, token, [url])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| email | <code>string</code> |  | is email of account pagseguro, exemple vendor@email |
| token | <code>string</code> |  | is token of account pagseguro, get the token in pagseguro configuration |
| [url] | <code>string</code> | <code>&quot;sandbox&quot;</code> | is a type of url api, exemple 'sandbox' or 'production' |

<a name="Transaction+setUrlVersion"></a>

### transaction.setUrlVersion([v])
setUrl
set url for requisition in pagseguro api

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [v] | <code>string</code> | <code>&quot;v2&quot;</code> | version api url for requisition, example 'v3', default value is 'v2' |

<a name="Transaction+setModeUrl"></a>

### transaction.setModeUrl([mode])
setModeUrl

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [mode] | <code>string</code> | <code>&quot;sandbox&quot;</code> | is trasaction mode, 'sandbox' for test or 'production' for production |

<a name="Transaction+getSession"></a>

### transaction.getSession() ⇒ <code>Promise</code>
getSession

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  
**Returns**: <code>Promise</code> - promise - return a pagseguro session for transaction  
<a name="Transaction+addItem"></a>

### transaction.addItem(item)
addItem

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| item | [<code>item</code>](#item) | item buy |

<a name="Transaction+setItems"></a>

### transaction.setItems(items)
setItems

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| items | [<code>Array.&lt;item&gt;</code>](#item) | array of object item |

<a name="Transaction+setSender"></a>

### transaction.setSender(sender)
setSender

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| sender | <code>Object</code> | representing a buyer |

<a name="Transaction+setShipping"></a>

### transaction.setShipping(shipping)
setShipping

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| shipping | <code>Object</code> | is a shipping of transaction |

<a name="Transaction+setReference"></a>

### transaction.setReference(reference)
setReference

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| reference | <code>string</code> | is a reference of transaction |

<a name="Transaction+setCurrency"></a>

### transaction.setCurrency(currency)
setCurrency

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| currency | <code>string</code> | is a symbol monetary, example Brazil id 'BRL' |

<a name="Transaction+setNotificationUrl"></a>

### transaction.setNotificationUrl(url)
setNotificationUrl

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | is your url for received notification of trasaction |

<a name="item"></a>

## item : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id item |
| description | <code>string</code> | description of item |
| amount | <code>string</code> | unity cost |
| quantity | <code>number</code> | unity quantity |

