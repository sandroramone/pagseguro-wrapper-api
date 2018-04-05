## Classes

<dl>
<dt><a href="#PagSeguro">PagSeguro</a></dt>
<dd><p>class PagSeguro represent the basic config of account</p>
</dd>
<dt><a href="#Transaction">Transaction</a> ⇐ <code><a href="#PagSeguro">PagSeguro</a></code></dt>
<dd><p>class Transaction represent the transaction pagseguro api endpoint</p>
</dd>
</dl>

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
| [url] | <code>string</code> | <code>&quot;&#x27;sandbox&#x27;&quot;</code> | is a type of url api, exemple 'sandbox' or 'production' |

<a name="Transaction"></a>

## Transaction ⇐ [<code>PagSeguro</code>](#PagSeguro)
class Transaction represent the transaction pagseguro api endpoint

**Kind**: global class  
**Extends**: [<code>PagSeguro</code>](#PagSeguro)  

* [Transaction](#Transaction) ⇐ [<code>PagSeguro</code>](#PagSeguro)
    * [new Transaction(email, token, [url])](#new_Transaction_new)
    * [.setUrl([v])](#Transaction+setUrl)
    * [.getSession()](#Transaction+getSession) ⇒ <code>Promise</code>
    * [.addItem(item)](#Transaction+addItem)
    * [.setItems(items)](#Transaction+setItems)
    * [.setSender(sender)](#Transaction+setSender)
    * [.setShipping(shipping)](#Transaction+setShipping)
    * [.setReference(reference)](#Transaction+setReference)
    * [.setCurrency(currency)](#Transaction+setCurrency)

<a name="new_Transaction_new"></a>

### new Transaction(email, token, [url])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| email | <code>string</code> |  | is email of account pagseguro, exemple vendor@email |
| token | <code>string</code> |  | is token of account pagseguro, get the token in pagseguro configuration |
| [url] | <code>string</code> | <code>&quot;&#x27;sandbox&#x27;&quot;</code> | is a type of url api, exemple 'sandbox' or 'production' |

<a name="Transaction+setUrl"></a>

### transaction.setUrl([v])
setUrl
set url for requisition in pagseguro api

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [v] | <code>string</code> | <code>&quot;&#x27;v2&#x27;&quot;</code> | version api url for requisition, example 'v3', default value is 'v2' |

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
| item | <code>object</code> | item buy |

<a name="Transaction+setItems"></a>

### transaction.setItems(items)
setItems

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>array</code> | array of object item |

<a name="Transaction+setSender"></a>

### transaction.setSender(sender)
setSender

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | representing a buyer |

<a name="Transaction+setShipping"></a>

### transaction.setShipping(shipping)
setShipping

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| shipping | <code>object</code> | is a shipping of transaction |

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

