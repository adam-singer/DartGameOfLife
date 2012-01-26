//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
$defProp(Object.prototype, '$index', function(i) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$index = function(i) { return this[i]; }
  }
  return this[i];
});
$defProp(Array.prototype, '$index', function(index) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i];
});
$defProp(String.prototype, '$index', function(i) {
  return this[i];
});
$defProp(Object.prototype, '$setindex', function(i, value) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$setindex = function(i, value) { return this[i] = value; }
  }
  return this[i] = value;
});
$defProp(Array.prototype, '$setindex', function(index, value) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i] = value;
});
function $wrap_call$0(fn) { return fn; }
function $add(x, y) {
  return ((typeof(x) == 'number' && typeof(y) == 'number') ||
          (typeof(x) == 'string'))
    ? x + y : x.$add(y);
}
function $eq(x, y) {
  if (x == null) return y == null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x == y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
function $gt(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x > y : x.$gt(y);
}
function $gte(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x >= y : x.$gte(y);
}
function $lte(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x <= y : x.$lte(y);
}
function $mul(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x * y : x.$mul(y);
}
function $sub(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x - y : x.$sub(y);
}
function $truncdiv(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') {
    if (y == 0) $throw(new IntegerDivisionByZeroException());
    var tmp = x / y;
    return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
  } else {
    return x.$truncdiv(y);
  }
}
$defProp(Object.prototype, '$typeNameOf', function() {
  if ((typeof(window) != 'undefined' && window.constructor.name == 'DOMWindow')
      || typeof(process) != 'undefined') { // fast-path for Chrome and Node
    return this.constructor.name;
  }
  var str = Object.prototype.toString.call(this);
  str = str.substring(8, str.length - 1);
  if (str == 'Window') {
    str = 'DOMWindow';
  } else if (str == 'Document') {
    str = 'HTMLDocument';
  }
  return str;
});
$defProp(Object.prototype, "get$typeName", Object.prototype.$typeNameOf);
// ********** Code for Object **************
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "is$Exception", function() {
  return false;
});
// ********** Code for IndexOutOfRangeException **************
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.is$Exception = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
}
NoSuchMethodException.prototype.is$Exception = function(){return true};
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  sb.add("]");
  return $add(("NoSuchMethodException - receiver: '" + this._receiver + "' "), ("function name: '" + this._functionName + "' arguments: [" + sb + "]"));
}
// ********** Code for ClosureArgumentMismatchException **************
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.is$Exception = function(){return true};
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for ObjectNotClosureException **************
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.is$Exception = function(){return true};
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(args) {
  this._args = args;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.is$Exception = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._args);
}
// ********** Code for StackOverflowException **************
function StackOverflowException() {

}
StackOverflowException.prototype.is$Exception = function(){return true};
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
// ********** Code for BadNumberFormatException **************
function BadNumberFormatException(_s) {
  this._s = _s;
}
BadNumberFormatException.prototype.is$Exception = function(){return true};
BadNumberFormatException.prototype.toString = function() {
  return ("BadNumberFormatException: '" + this._s + "'");
}
// ********** Code for NullPointerException **************
function NullPointerException() {

}
NullPointerException.prototype.is$Exception = function(){return true};
NullPointerException.prototype.toString = function() {
  return "NullPointerException";
}
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.is$Exception = function(){return true};
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for EmptyQueueException **************
function EmptyQueueException() {

}
EmptyQueueException.prototype.is$Exception = function(){return true};
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.is$Exception = function(){return true};
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for IntegerDivisionByZeroException **************
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
IntegerDivisionByZeroException.prototype.is$Exception = function(){return true};
IntegerDivisionByZeroException.prototype.toString = function() {
  return "IntegerDivisionByZeroException";
}
// ********** Code for dart_core_Function **************
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
Function.prototype.to$call$2 = function() {
  this.call$2 = this._genStub(2);
  this.to$call$2 = function() { return this.call$2; };
  return this.call$2;
};
Function.prototype.call$2 = function($0, $1) {
  return this.to$call$2()($0, $1);
};
function to$call$2(f) { return f && f.to$call$2(); }
// ********** Code for top level **************
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException());
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException());
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "clear", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
// ********** Code for ListIterator **************
function ListIterator(array) {
  this._dart_coreimpl_array = array;
  this._dart_coreimpl_pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._dart_coreimpl_array.get$length() > this._dart_coreimpl_pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  return this._dart_coreimpl_array.$index(this._dart_coreimpl_pos++);
}
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
NumImplementation.prototype.toInt = function() {
    'use strict';
    if (isNaN(this)) $throw(new BadNumberFormatException("NaN"));
    if ((this == Infinity) || (this == -Infinity)) {
      $throw(new BadNumberFormatException("Infinity"));
    }
    var truncated = (this < 0) ? Math.ceil(this) : Math.floor(this);
    if (truncated == -0.0) return 0;
    return truncated;
}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {}
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && ((null == const$0001 ? null == (existingKey) : const$0001 === existingKey))) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) return (-1);
    if ($eq(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (null == key || (null == key ? null == (const$0001) : key === const$0001)) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.clear = function() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    this._keys.$setindex(i);
    this._values.$setindex(i);
  }
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  var $0;
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0001) : $0 === const$0001))) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.remove = function(key) {
  var index = this._probeForLookup(key);
  if (index >= (0)) {
    this._numberOfEntries--;
    var value = this._values.$index(index);
    this._values.$setindex(index);
    this._keys.$setindex(index, const$0001);
    this._numberOfDeleted++;
    return value;
  }
  return null;
}
HashMapImplementation.prototype.get$length = function() {
  return this._numberOfEntries;
}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0001) : key !== const$0001))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.getKeys = function() {
  var list = new Array(this.get$length());
  var i = (0);
  this.forEach(function _(key, value) {
    list.$setindex(i++, key);
  }
  );
  return list;
}
HashMapImplementation.prototype.containsKey = function(key) {
  return (this._probeForLookup(key) != (-1));
}
// ********** Code for HashMapImplementation_Cell$Cell **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(HashMapImplementation_Cell$Cell, HashMapImplementation);
function HashMapImplementation_Cell$Cell() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
// ********** Code for HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair, HashMapImplementation);
function HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
// ********** Code for _DeletedKeySentinel **************
function _DeletedKeySentinel() {

}
// ********** Code for KeyValuePair **************
function KeyValuePair(key, value) {
  this.value = value;
  this.key = key;
}
KeyValuePair.prototype.get$value = function() { return this.value; };
KeyValuePair.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for LinkedHashMapImplementation **************
function LinkedHashMapImplementation() {
  this._map = new HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair();
  this._list = new DoubleLinkedQueue_KeyValuePair();
}
LinkedHashMapImplementation.prototype.$setindex = function(key, value) {
  if (this._map.containsKey(key)) {
    this._map.$index(key).get$element().set$value(value);
  }
  else {
    this._list.addLast(new KeyValuePair(key, value));
    this._map.$setindex(key, this._list.lastEntry());
  }
}
LinkedHashMapImplementation.prototype.$index = function(key) {
  var entry = this._map.$index(key);
  if (null == entry) return null;
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.remove = function(key) {
  var entry = this._map.remove(key);
  if (null == entry) return null;
  entry.remove();
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.getKeys = function() {
  var list = new Array(this.get$length());
  var index = (0);
  this._list.forEach(function _(entry) {
    list.$setindex(index++, entry.key);
  }
  );
  return list;
}
LinkedHashMapImplementation.prototype.containsKey = function(key) {
  return this._map.containsKey(key);
}
LinkedHashMapImplementation.prototype.get$length = function() {
  return this._map.get$length();
}
LinkedHashMapImplementation.prototype.clear = function() {
  this._map.clear();
  this._list.clear();
}
// ********** Code for DoubleLinkedQueueEntry **************
function DoubleLinkedQueueEntry(e) {
  this._element = e;
}
DoubleLinkedQueueEntry.prototype._link = function(p, n) {
  this._next = n;
  this._previous = p;
  p._next = this;
  n._previous = this;
}
DoubleLinkedQueueEntry.prototype.prepend = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this._previous, this);
}
DoubleLinkedQueueEntry.prototype.remove = function() {
  this._previous._next = this._next;
  this._next._previous = this._previous;
  this._next = null;
  this._previous = null;
  return this._element;
}
DoubleLinkedQueueEntry.prototype._asNonSentinelEntry = function() {
  return this;
}
DoubleLinkedQueueEntry.prototype.previousEntry = function() {
  return this._previous._asNonSentinelEntry();
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._element;
}
// ********** Code for DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(DoubleLinkedQueueEntry_KeyValuePair, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_KeyValuePair(e) {
  this._element = e;
}
// ********** Code for _DoubleLinkedQueueEntrySentinel **************
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {}
_DoubleLinkedQueueEntrySentinel.prototype.remove = function() {
  $throw(const$0000);
}
_DoubleLinkedQueueEntrySentinel.prototype._asNonSentinelEntry = function() {
  return null;
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0000);
}
// ********** Code for _DoubleLinkedQueueEntrySentinel_KeyValuePair **************
$inherits(_DoubleLinkedQueueEntrySentinel_KeyValuePair, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_KeyValuePair() {
  DoubleLinkedQueueEntry_KeyValuePair.call(this, null);
  this._link(this, this);
}
// ********** Code for DoubleLinkedQueue **************
function DoubleLinkedQueue() {}
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.lastEntry = function() {
  return this._sentinel.previousEntry();
}
DoubleLinkedQueue.prototype.clear = function() {
  this._sentinel._next = this._sentinel;
  this._sentinel._previous = this._sentinel;
}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
// ********** Code for DoubleLinkedQueue_KeyValuePair **************
$inherits(DoubleLinkedQueue_KeyValuePair, DoubleLinkedQueue);
function DoubleLinkedQueue_KeyValuePair() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_KeyValuePair();
}
// ********** Code for _DoubleLinkedQueueIterator **************
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  var $0;
  return (($0 = this._currentEntry._next) == null ? null != (this._sentinel) : $0 !== this._sentinel);
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._dart_coreimpl_length = this._dart_coreimpl_length + str.length;
  return this;
}
StringBufferImpl.prototype.clear = function() {
  this._buffer = new Array();
  this._dart_coreimpl_length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear();
  this._buffer.add(result);
  return result;
}
// ********** Code for StringBase **************
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add($add(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
// ********** Code for _Worker **************
// ********** Code for _ArgumentMismatchException **************
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
// ********** Code for _FunctionImplementation **************
_FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches
      if (this.length == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = this.length - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > this.length ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (this.length == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
// ********** Code for top level **************
function _map(itemsAndKeys) {
  var ret = new LinkedHashMapImplementation();
  for (var i = (0);
   i < itemsAndKeys.get$length(); ) {
    ret.$setindex(itemsAndKeys.$index(i++), itemsAndKeys.$index(i++));
  }
  return ret;
}
//  ********** Library dom **************
// ********** Code for DOMTypeJs **************
// ********** Code for AbstractWorkerJs **************
// ********** Code for ArrayBufferJs **************
// ********** Code for ArrayBufferViewJs **************
// ********** Code for NodeJs **************
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;
    var proto = Object.getPrototypeOf(obj);
    if (!proto.hasOwnProperty(name)) {
      $defProp(proto, name, method);
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  $defProp(Object.prototype, name, $dynamicBind);
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];

function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
$dynamic("get$textContent").Node = function() {
  return this.textContent;
}
// ********** Code for AttrJs **************
$dynamic("get$value").Attr = function() {
  return this.value;
}
$dynamic("set$value").Attr = function(value) {
  this.value = value;
}
// ********** Code for AudioBufferJs **************
// ********** Code for AudioNodeJs **************
// ********** Code for AudioSourceNodeJs **************
// ********** Code for AudioBufferSourceNodeJs **************
// ********** Code for AudioChannelMergerJs **************
// ********** Code for AudioChannelSplitterJs **************
// ********** Code for AudioContextJs **************
// ********** Code for AudioDestinationNodeJs **************
// ********** Code for AudioParamJs **************
$dynamic("get$value").AudioParam = function() {
  return this.value;
}
$dynamic("set$value").AudioParam = function(value) {
  this.value = value;
}
// ********** Code for AudioGainJs **************
// ********** Code for AudioGainNodeJs **************
// ********** Code for AudioListenerJs **************
// ********** Code for AudioPannerNodeJs **************
// ********** Code for EventJs **************
// ********** Code for AudioProcessingEventJs **************
// ********** Code for BarInfoJs **************
// ********** Code for BeforeLoadEventJs **************
// ********** Code for BiquadFilterNodeJs **************
// ********** Code for BlobJs **************
// ********** Code for CharacterDataJs **************
// ********** Code for TextJs **************
// ********** Code for CDATASectionJs **************
// ********** Code for CSSRuleJs **************
// ********** Code for CSSCharsetRuleJs **************
// ********** Code for CSSFontFaceRuleJs **************
// ********** Code for CSSImportRuleJs **************
// ********** Code for CSSMediaRuleJs **************
// ********** Code for CSSPageRuleJs **************
// ********** Code for CSSValueJs **************
// ********** Code for CSSPrimitiveValueJs **************
// ********** Code for CSSRuleListJs **************
// ********** Code for CSSStyleDeclarationJs **************
// ********** Code for CSSStyleRuleJs **************
// ********** Code for StyleSheetJs **************
// ********** Code for CSSStyleSheetJs **************
// ********** Code for CSSUnknownRuleJs **************
// ********** Code for CSSValueListJs **************
// ********** Code for CanvasGradientJs **************
// ********** Code for CanvasPatternJs **************
// ********** Code for CanvasPixelArrayJs **************
$dynamic("get$length").CanvasPixelArray = function() {
  return this.length;
}
$dynamic("$index").CanvasPixelArray = function(index) {
  return this[index];
}
$dynamic("$setindex").CanvasPixelArray = function(index, value) {
  this[index] = value
}
$dynamic("iterator").CanvasPixelArray = function() {
  return new _FixedSizeListIterator_int(this);
}
// ********** Code for CanvasRenderingContextJs **************
// ********** Code for CanvasRenderingContext2DJs **************
$dynamic("set$lineCap").CanvasRenderingContext2D = function(value) {
  this.lineCap = value;
}
$dynamic("set$lineWidth").CanvasRenderingContext2D = function(value) {
  this.lineWidth = value;
}
// ********** Code for ClientRectJs **************
// ********** Code for ClientRectListJs **************
// ********** Code for ClipboardJs **************
// ********** Code for CloseEventJs **************
// ********** Code for CommentJs **************
// ********** Code for UIEventJs **************
// ********** Code for CompositionEventJs **************
// ********** Code for ConsoleJs **************
ConsoleJs = (typeof console == 'undefined' ? {} : console);
// ********** Code for ConvolverNodeJs **************
// ********** Code for CoordinatesJs **************
// ********** Code for CounterJs **************
// ********** Code for CryptoJs **************
// ********** Code for CustomEventJs **************
// ********** Code for DOMApplicationCacheJs **************
// ********** Code for DOMExceptionJs **************
// ********** Code for DOMFileSystemJs **************
// ********** Code for DOMFileSystemSyncJs **************
// ********** Code for DOMFormDataJs **************
// ********** Code for DOMImplementationJs **************
// ********** Code for DOMMimeTypeJs **************
// ********** Code for DOMMimeTypeArrayJs **************
// ********** Code for DOMParserJs **************
// ********** Code for DOMPluginJs **************
// ********** Code for DOMPluginArrayJs **************
// ********** Code for DOMSelectionJs **************
// ********** Code for DOMTokenListJs **************
// ********** Code for DOMSettableTokenListJs **************
$dynamic("get$value").DOMSettableTokenList = function() {
  return this.value;
}
$dynamic("set$value").DOMSettableTokenList = function(value) {
  this.value = value;
}
// ********** Code for DOMURLJs **************
// ********** Code for DOMWindowJs **************
// ********** Code for DataTransferItemJs **************
// ********** Code for DataTransferItemListJs **************
// ********** Code for DataViewJs **************
// ********** Code for DatabaseJs **************
// ********** Code for DatabaseSyncJs **************
// ********** Code for WorkerContextJs **************
// ********** Code for DedicatedWorkerContextJs **************
// ********** Code for DelayNodeJs **************
// ********** Code for DeviceMotionEventJs **************
// ********** Code for DeviceOrientationEventJs **************
// ********** Code for EntryJs **************
// ********** Code for DirectoryEntryJs **************
// ********** Code for EntrySyncJs **************
// ********** Code for DirectoryEntrySyncJs **************
// ********** Code for DirectoryReaderJs **************
// ********** Code for DirectoryReaderSyncJs **************
// ********** Code for DocumentJs **************
// ********** Code for DocumentFragmentJs **************
// ********** Code for DocumentTypeJs **************
// ********** Code for DynamicsCompressorNodeJs **************
// ********** Code for ElementJs **************
// ********** Code for ElementTimeControlJs **************
// ********** Code for ElementTraversalJs **************
// ********** Code for EntityJs **************
// ********** Code for EntityReferenceJs **************
// ********** Code for EntryArrayJs **************
// ********** Code for EntryArraySyncJs **************
// ********** Code for ErrorEventJs **************
// ********** Code for EventExceptionJs **************
// ********** Code for EventSourceJs **************
// ********** Code for EventTargetJs **************
// ********** Code for FileJs **************
// ********** Code for FileEntryJs **************
// ********** Code for FileEntrySyncJs **************
// ********** Code for FileErrorJs **************
// ********** Code for FileExceptionJs **************
// ********** Code for FileListJs **************
// ********** Code for FileReaderJs **************
// ********** Code for FileReaderSyncJs **************
// ********** Code for FileWriterJs **************
// ********** Code for FileWriterSyncJs **************
// ********** Code for Float32ArrayJs **************
var Float32ArrayJs = {};
$dynamic("get$length").Float32Array = function() {
  return this.length;
}
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float32Array = function() {
  return new _FixedSizeListIterator_num(this);
}
// ********** Code for Float64ArrayJs **************
var Float64ArrayJs = {};
$dynamic("get$length").Float64Array = function() {
  return this.length;
}
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float64Array = function() {
  return new _FixedSizeListIterator_num(this);
}
// ********** Code for GeolocationJs **************
// ********** Code for GeopositionJs **************
// ********** Code for HTMLAllCollectionJs **************
// ********** Code for HTMLElementJs **************
$dynamic("set$innerHTML").HTMLElement = function(value) {
  this.innerHTML = value;
}
// ********** Code for HTMLAnchorElementJs **************
// ********** Code for HTMLAppletElementJs **************
// ********** Code for HTMLAreaElementJs **************
// ********** Code for HTMLMediaElementJs **************
// ********** Code for HTMLAudioElementJs **************
// ********** Code for HTMLBRElementJs **************
// ********** Code for HTMLBaseElementJs **************
// ********** Code for HTMLBaseFontElementJs **************
// ********** Code for HTMLBodyElementJs **************
// ********** Code for HTMLButtonElementJs **************
$dynamic("set$disabled").HTMLButtonElement = function(value) {
  this.disabled = value;
}
$dynamic("get$value").HTMLButtonElement = function() {
  return this.value;
}
$dynamic("set$value").HTMLButtonElement = function(value) {
  this.value = value;
}
// ********** Code for HTMLCanvasElementJs **************
// ********** Code for HTMLCollectionJs **************
$dynamic("get$length").HTMLCollection = function() {
  return this.length;
}
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").HTMLCollection = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
// ********** Code for HTMLDListElementJs **************
// ********** Code for HTMLDataListElementJs **************
// ********** Code for HTMLDetailsElementJs **************
// ********** Code for HTMLDirectoryElementJs **************
// ********** Code for HTMLDivElementJs **************
// ********** Code for HTMLDocumentJs **************
// ********** Code for HTMLEmbedElementJs **************
// ********** Code for HTMLFieldSetElementJs **************
// ********** Code for HTMLFontElementJs **************
// ********** Code for HTMLFormElementJs **************
// ********** Code for HTMLFrameElementJs **************
// ********** Code for HTMLFrameSetElementJs **************
// ********** Code for HTMLHRElementJs **************
// ********** Code for HTMLHeadElementJs **************
// ********** Code for HTMLHeadingElementJs **************
// ********** Code for HTMLHtmlElementJs **************
// ********** Code for HTMLIFrameElementJs **************
// ********** Code for HTMLImageElementJs **************
// ********** Code for HTMLInputElementJs **************
$dynamic("set$disabled").HTMLInputElement = function(value) {
  this.disabled = value;
}
$dynamic("get$value").HTMLInputElement = function() {
  return this.value;
}
$dynamic("set$value").HTMLInputElement = function(value) {
  this.value = value;
}
$dynamic("get$valueAsNumber").HTMLInputElement = function() {
  return this.valueAsNumber;
}
$dynamic("set$valueAsNumber").HTMLInputElement = function(value) {
  this.valueAsNumber = value;
}
// ********** Code for HTMLIsIndexElementJs **************
// ********** Code for HTMLKeygenElementJs **************
// ********** Code for HTMLLIElementJs **************
$dynamic("get$value").HTMLLIElement = function() {
  return this.value;
}
$dynamic("set$value").HTMLLIElement = function(value) {
  this.value = value;
}
// ********** Code for HTMLLabelElementJs **************
// ********** Code for HTMLLegendElementJs **************
// ********** Code for HTMLLinkElementJs **************
// ********** Code for HTMLMapElementJs **************
// ********** Code for HTMLMarqueeElementJs **************
// ********** Code for HTMLMenuElementJs **************
// ********** Code for HTMLMetaElementJs **************
// ********** Code for HTMLMeterElementJs **************
$dynamic("get$value").HTMLMeterElement = function() {
  return this.value;
}
$dynamic("set$value").HTMLMeterElement = function(value) {
  this.value = value;
}
// ********** Code for HTMLModElementJs **************
// ********** Code for HTMLOListElementJs **************
// ********** Code for HTMLObjectElementJs **************
// ********** Code for HTMLOptGroupElementJs **************
// ********** Code for HTMLOptionElementJs **************
$dynamic("get$value").HTMLOptionElement = function() {
  return this.value;
}
$dynamic("set$value").HTMLOptionElement = function(value) {
  this.value = value;
}
// ********** Code for HTMLOptionsCollectionJs **************
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
// ********** Code for HTMLOutputElementJs **************
$dynamic("get$value").HTMLOutputElement = function() {
  return this.value;
}
$dynamic("set$value").HTMLOutputElement = function(value) {
  this.value = value;
}
// ********** Code for HTMLParagraphElementJs **************
// ********** Code for HTMLParamElementJs **************
$dynamic("get$value").HTMLParamElement = function() {
  return this.value;
}
$dynamic("set$value").HTMLParamElement = function(value) {
  this.value = value;
}
// ********** Code for HTMLPreElementJs **************
// ********** Code for HTMLProgressElementJs **************
$dynamic("get$value").HTMLProgressElement = function() {
  return this.value;
}
$dynamic("set$value").HTMLProgressElement = function(value) {
  this.value = value;
}
// ********** Code for HTMLPropertiesCollectionJs **************
$dynamic("get$length").HTMLPropertiesCollection = function() {
  return this.length;
}
// ********** Code for HTMLQuoteElementJs **************
// ********** Code for HTMLScriptElementJs **************
// ********** Code for HTMLSelectElementJs **************
$dynamic("set$disabled").HTMLSelectElement = function(value) {
  this.disabled = value;
}
$dynamic("get$options").HTMLSelectElement = function() {
  return this.options;
}
$dynamic("get$selectedIndex").HTMLSelectElement = function() {
  return this.selectedIndex;
}
$dynamic("set$selectedIndex").HTMLSelectElement = function(value) {
  this.selectedIndex = value;
}
$dynamic("get$value").HTMLSelectElement = function() {
  return this.value;
}
$dynamic("set$value").HTMLSelectElement = function(value) {
  this.value = value;
}
// ********** Code for HTMLSourceElementJs **************
// ********** Code for HTMLSpanElementJs **************
// ********** Code for HTMLStyleElementJs **************
// ********** Code for HTMLTableCaptionElementJs **************
// ********** Code for HTMLTableCellElementJs **************
// ********** Code for HTMLTableColElementJs **************
// ********** Code for HTMLTableElementJs **************
// ********** Code for HTMLTableRowElementJs **************
// ********** Code for HTMLTableSectionElementJs **************
// ********** Code for HTMLTextAreaElementJs **************
$dynamic("get$value").HTMLTextAreaElement = function() {
  return this.value;
}
$dynamic("set$value").HTMLTextAreaElement = function(value) {
  this.value = value;
}
// ********** Code for HTMLTitleElementJs **************
// ********** Code for HTMLTrackElementJs **************
// ********** Code for HTMLUListElementJs **************
// ********** Code for HTMLUnknownElementJs **************
// ********** Code for HTMLVideoElementJs **************
// ********** Code for HashChangeEventJs **************
// ********** Code for HighPass2FilterNodeJs **************
// ********** Code for HistoryJs **************
// ********** Code for IDBAnyJs **************
// ********** Code for IDBCursorJs **************
// ********** Code for IDBCursorWithValueJs **************
$dynamic("get$value").IDBCursorWithValue = function() {
  return this.value;
}
// ********** Code for IDBDatabaseJs **************
// ********** Code for IDBDatabaseErrorJs **************
// ********** Code for IDBDatabaseExceptionJs **************
// ********** Code for IDBFactoryJs **************
// ********** Code for IDBIndexJs **************
// ********** Code for IDBKeyJs **************
// ********** Code for IDBKeyRangeJs **************
// ********** Code for IDBObjectStoreJs **************
// ********** Code for IDBRequestJs **************
// ********** Code for IDBTransactionJs **************
// ********** Code for IDBVersionChangeEventJs **************
// ********** Code for IDBVersionChangeRequestJs **************
// ********** Code for ImageDataJs **************
// ********** Code for InjectedScriptHostJs **************
// ********** Code for InspectorFrontendHostJs **************
// ********** Code for Int16ArrayJs **************
var Int16ArrayJs = {};
$dynamic("get$length").Int16Array = function() {
  return this.length;
}
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
// ********** Code for Int32ArrayJs **************
var Int32ArrayJs = {};
$dynamic("get$length").Int32Array = function() {
  return this.length;
}
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
// ********** Code for Int8ArrayJs **************
var Int8ArrayJs = {};
$dynamic("get$length").Int8Array = function() {
  return this.length;
}
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
// ********** Code for JavaScriptAudioNodeJs **************
// ********** Code for JavaScriptCallFrameJs **************
// ********** Code for KeyboardEventJs **************
// ********** Code for LocationJs **************
// ********** Code for LowPass2FilterNodeJs **************
// ********** Code for MediaControllerJs **************
// ********** Code for MediaElementAudioSourceNodeJs **************
// ********** Code for MediaErrorJs **************
// ********** Code for MediaListJs **************
$dynamic("get$length").MediaList = function() {
  return this.length;
}
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").MediaList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
// ********** Code for MediaQueryListJs **************
// ********** Code for MediaQueryListListenerJs **************
// ********** Code for MemoryInfoJs **************
// ********** Code for MessageChannelJs **************
// ********** Code for MessageEventJs **************
// ********** Code for MessagePortJs **************
// ********** Code for MetadataJs **************
// ********** Code for MouseEventJs **************
// ********** Code for MutationCallbackJs **************
// ********** Code for MutationEventJs **************
// ********** Code for MutationRecordJs **************
// ********** Code for NamedNodeMapJs **************
$dynamic("get$length").NamedNodeMap = function() {
  return this.length;
}
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NamedNodeMap = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
// ********** Code for NavigatorJs **************
// ********** Code for NodeFilterJs **************
// ********** Code for NodeIteratorJs **************
// ********** Code for NodeListJs **************
$dynamic("get$length").NodeList = function() {
  return this.length;
}
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("$setindex").NodeList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NodeList = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
// ********** Code for NodeSelectorJs **************
// ********** Code for NotationJs **************
// ********** Code for NotificationJs **************
// ********** Code for NotificationCenterJs **************
// ********** Code for OESStandardDerivativesJs **************
// ********** Code for OESTextureFloatJs **************
// ********** Code for OESVertexArrayObjectJs **************
// ********** Code for OfflineAudioCompletionEventJs **************
// ********** Code for OperationNotAllowedExceptionJs **************
// ********** Code for OverflowEventJs **************
// ********** Code for PageTransitionEventJs **************
// ********** Code for PerformanceJs **************
// ********** Code for PerformanceNavigationJs **************
// ********** Code for PerformanceTimingJs **************
// ********** Code for PointerLockJs **************
// ********** Code for PopStateEventJs **************
// ********** Code for PositionErrorJs **************
// ********** Code for ProcessingInstructionJs **************
// ********** Code for ProgressEventJs **************
// ********** Code for RGBColorJs **************
// ********** Code for RangeJs **************
// ********** Code for RangeExceptionJs **************
// ********** Code for RealtimeAnalyserNodeJs **************
// ********** Code for RectJs **************
// ********** Code for SQLErrorJs **************
// ********** Code for SQLExceptionJs **************
// ********** Code for SQLResultSetJs **************
// ********** Code for SQLResultSetRowListJs **************
// ********** Code for SQLTransactionJs **************
// ********** Code for SQLTransactionSyncJs **************
// ********** Code for SVGElementJs **************
// ********** Code for SVGAElementJs **************
// ********** Code for SVGAltGlyphDefElementJs **************
// ********** Code for SVGTextContentElementJs **************
// ********** Code for SVGTextPositioningElementJs **************
// ********** Code for SVGAltGlyphElementJs **************
// ********** Code for SVGAltGlyphItemElementJs **************
// ********** Code for SVGAngleJs **************
$dynamic("get$value").SVGAngle = function() {
  return this.value;
}
$dynamic("set$value").SVGAngle = function(value) {
  this.value = value;
}
// ********** Code for SVGAnimationElementJs **************
// ********** Code for SVGAnimateColorElementJs **************
// ********** Code for SVGAnimateElementJs **************
// ********** Code for SVGAnimateMotionElementJs **************
// ********** Code for SVGAnimateTransformElementJs **************
// ********** Code for SVGAnimatedAngleJs **************
// ********** Code for SVGAnimatedBooleanJs **************
// ********** Code for SVGAnimatedEnumerationJs **************
// ********** Code for SVGAnimatedIntegerJs **************
// ********** Code for SVGAnimatedLengthJs **************
// ********** Code for SVGAnimatedLengthListJs **************
// ********** Code for SVGAnimatedNumberJs **************
// ********** Code for SVGAnimatedNumberListJs **************
// ********** Code for SVGAnimatedPreserveAspectRatioJs **************
// ********** Code for SVGAnimatedRectJs **************
// ********** Code for SVGAnimatedStringJs **************
// ********** Code for SVGAnimatedTransformListJs **************
// ********** Code for SVGCircleElementJs **************
// ********** Code for SVGClipPathElementJs **************
// ********** Code for SVGColorJs **************
// ********** Code for SVGComponentTransferFunctionElementJs **************
// ********** Code for SVGCursorElementJs **************
// ********** Code for SVGDefsElementJs **************
// ********** Code for SVGDescElementJs **************
// ********** Code for SVGDocumentJs **************
// ********** Code for SVGElementInstanceJs **************
// ********** Code for SVGElementInstanceListJs **************
// ********** Code for SVGEllipseElementJs **************
// ********** Code for SVGExceptionJs **************
// ********** Code for SVGExternalResourcesRequiredJs **************
// ********** Code for SVGFEBlendElementJs **************
// ********** Code for SVGFEColorMatrixElementJs **************
// ********** Code for SVGFEComponentTransferElementJs **************
// ********** Code for SVGFECompositeElementJs **************
// ********** Code for SVGFEConvolveMatrixElementJs **************
// ********** Code for SVGFEDiffuseLightingElementJs **************
// ********** Code for SVGFEDisplacementMapElementJs **************
// ********** Code for SVGFEDistantLightElementJs **************
// ********** Code for SVGFEDropShadowElementJs **************
// ********** Code for SVGFEFloodElementJs **************
// ********** Code for SVGFEFuncAElementJs **************
// ********** Code for SVGFEFuncBElementJs **************
// ********** Code for SVGFEFuncGElementJs **************
// ********** Code for SVGFEFuncRElementJs **************
// ********** Code for SVGFEGaussianBlurElementJs **************
// ********** Code for SVGFEImageElementJs **************
// ********** Code for SVGFEMergeElementJs **************
// ********** Code for SVGFEMergeNodeElementJs **************
// ********** Code for SVGFEMorphologyElementJs **************
// ********** Code for SVGFEOffsetElementJs **************
// ********** Code for SVGFEPointLightElementJs **************
// ********** Code for SVGFESpecularLightingElementJs **************
// ********** Code for SVGFESpotLightElementJs **************
// ********** Code for SVGFETileElementJs **************
// ********** Code for SVGFETurbulenceElementJs **************
// ********** Code for SVGFilterElementJs **************
// ********** Code for SVGStylableJs **************
// ********** Code for SVGFilterPrimitiveStandardAttributesJs **************
// ********** Code for SVGFitToViewBoxJs **************
// ********** Code for SVGFontElementJs **************
// ********** Code for SVGFontFaceElementJs **************
// ********** Code for SVGFontFaceFormatElementJs **************
// ********** Code for SVGFontFaceNameElementJs **************
// ********** Code for SVGFontFaceSrcElementJs **************
// ********** Code for SVGFontFaceUriElementJs **************
// ********** Code for SVGForeignObjectElementJs **************
// ********** Code for SVGGElementJs **************
// ********** Code for SVGGlyphElementJs **************
// ********** Code for SVGGlyphRefElementJs **************
// ********** Code for SVGGradientElementJs **************
// ********** Code for SVGHKernElementJs **************
// ********** Code for SVGImageElementJs **************
// ********** Code for SVGLangSpaceJs **************
// ********** Code for SVGLengthJs **************
$dynamic("get$value").SVGLength = function() {
  return this.value;
}
$dynamic("set$value").SVGLength = function(value) {
  this.value = value;
}
// ********** Code for SVGLengthListJs **************
// ********** Code for SVGLineElementJs **************
// ********** Code for SVGLinearGradientElementJs **************
// ********** Code for SVGLocatableJs **************
// ********** Code for SVGMPathElementJs **************
// ********** Code for SVGMarkerElementJs **************
// ********** Code for SVGMaskElementJs **************
// ********** Code for SVGMatrixJs **************
// ********** Code for SVGMetadataElementJs **************
// ********** Code for SVGMissingGlyphElementJs **************
// ********** Code for SVGNumberJs **************
$dynamic("get$value").SVGNumber = function() {
  return this.value;
}
$dynamic("set$value").SVGNumber = function(value) {
  this.value = value;
}
// ********** Code for SVGNumberListJs **************
// ********** Code for SVGPaintJs **************
// ********** Code for SVGPathElementJs **************
// ********** Code for SVGPathSegJs **************
// ********** Code for SVGPathSegArcAbsJs **************
// ********** Code for SVGPathSegArcRelJs **************
// ********** Code for SVGPathSegClosePathJs **************
// ********** Code for SVGPathSegCurvetoCubicAbsJs **************
// ********** Code for SVGPathSegCurvetoCubicRelJs **************
// ********** Code for SVGPathSegCurvetoCubicSmoothAbsJs **************
// ********** Code for SVGPathSegCurvetoCubicSmoothRelJs **************
// ********** Code for SVGPathSegCurvetoQuadraticAbsJs **************
// ********** Code for SVGPathSegCurvetoQuadraticRelJs **************
// ********** Code for SVGPathSegCurvetoQuadraticSmoothAbsJs **************
// ********** Code for SVGPathSegCurvetoQuadraticSmoothRelJs **************
// ********** Code for SVGPathSegLinetoAbsJs **************
// ********** Code for SVGPathSegLinetoHorizontalAbsJs **************
// ********** Code for SVGPathSegLinetoHorizontalRelJs **************
// ********** Code for SVGPathSegLinetoRelJs **************
// ********** Code for SVGPathSegLinetoVerticalAbsJs **************
// ********** Code for SVGPathSegLinetoVerticalRelJs **************
// ********** Code for SVGPathSegListJs **************
// ********** Code for SVGPathSegMovetoAbsJs **************
// ********** Code for SVGPathSegMovetoRelJs **************
// ********** Code for SVGPatternElementJs **************
// ********** Code for SVGPointJs **************
// ********** Code for SVGPointListJs **************
// ********** Code for SVGPolygonElementJs **************
// ********** Code for SVGPolylineElementJs **************
// ********** Code for SVGPreserveAspectRatioJs **************
// ********** Code for SVGRadialGradientElementJs **************
// ********** Code for SVGRectJs **************
// ********** Code for SVGRectElementJs **************
// ********** Code for SVGRenderingIntentJs **************
// ********** Code for SVGSVGElementJs **************
// ********** Code for SVGScriptElementJs **************
// ********** Code for SVGSetElementJs **************
// ********** Code for SVGStopElementJs **************
// ********** Code for SVGStringListJs **************
// ********** Code for SVGStyleElementJs **************
// ********** Code for SVGSwitchElementJs **************
// ********** Code for SVGSymbolElementJs **************
// ********** Code for SVGTRefElementJs **************
// ********** Code for SVGTSpanElementJs **************
// ********** Code for SVGTestsJs **************
// ********** Code for SVGTextElementJs **************
// ********** Code for SVGTextPathElementJs **************
// ********** Code for SVGTitleElementJs **************
// ********** Code for SVGTransformJs **************
// ********** Code for SVGTransformListJs **************
// ********** Code for SVGTransformableJs **************
// ********** Code for SVGURIReferenceJs **************
// ********** Code for SVGUnitTypesJs **************
// ********** Code for SVGUseElementJs **************
// ********** Code for SVGVKernElementJs **************
// ********** Code for SVGViewElementJs **************
// ********** Code for SVGZoomAndPanJs **************
// ********** Code for SVGViewSpecJs **************
// ********** Code for SVGZoomEventJs **************
// ********** Code for ScreenJs **************
// ********** Code for ScriptProfileJs **************
// ********** Code for ScriptProfileNodeJs **************
// ********** Code for SharedWorkerJs **************
// ********** Code for SharedWorkerContextJs **************
// ********** Code for SpeechInputEventJs **************
// ********** Code for SpeechInputResultJs **************
// ********** Code for SpeechInputResultListJs **************
// ********** Code for StorageJs **************
// ********** Code for StorageEventJs **************
// ********** Code for StorageInfoJs **************
// ********** Code for StyleMediaJs **************
// ********** Code for StyleSheetListJs **************
$dynamic("get$length").StyleSheetList = function() {
  return this.length;
}
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").StyleSheetList = function() {
  return new _FixedSizeListIterator_dom_StyleSheet(this);
}
// ********** Code for TextEventJs **************
// ********** Code for TextMetricsJs **************
// ********** Code for TextTrackJs **************
// ********** Code for TextTrackCueJs **************
// ********** Code for TextTrackCueListJs **************
// ********** Code for TextTrackListJs **************
// ********** Code for TimeRangesJs **************
// ********** Code for TouchJs **************
// ********** Code for TouchEventJs **************
// ********** Code for TouchListJs **************
$dynamic("get$length").TouchList = function() {
  return this.length;
}
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").TouchList = function() {
  return new _FixedSizeListIterator_dom_Touch(this);
}
// ********** Code for TrackEventJs **************
// ********** Code for TreeWalkerJs **************
// ********** Code for Uint16ArrayJs **************
var Uint16ArrayJs = {};
$dynamic("get$length").Uint16Array = function() {
  return this.length;
}
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
// ********** Code for Uint32ArrayJs **************
var Uint32ArrayJs = {};
$dynamic("get$length").Uint32Array = function() {
  return this.length;
}
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
// ********** Code for Uint8ArrayJs **************
var Uint8ArrayJs = {};
$dynamic("get$length").Uint8Array = function() {
  return this.length;
}
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
// ********** Code for ValidityStateJs **************
// ********** Code for WaveShaperNodeJs **************
// ********** Code for WebGLActiveInfoJs **************
// ********** Code for WebGLBufferJs **************
// ********** Code for WebGLCompressedTexturesJs **************
// ********** Code for WebGLContextAttributesJs **************
// ********** Code for WebGLContextEventJs **************
// ********** Code for WebGLDebugRendererInfoJs **************
// ********** Code for WebGLDebugShadersJs **************
// ********** Code for WebGLFramebufferJs **************
// ********** Code for WebGLLoseContextJs **************
// ********** Code for WebGLProgramJs **************
// ********** Code for WebGLRenderbufferJs **************
// ********** Code for WebGLRenderingContextJs **************
// ********** Code for WebGLShaderJs **************
// ********** Code for WebGLTextureJs **************
// ********** Code for WebGLUniformLocationJs **************
// ********** Code for WebGLVertexArrayObjectOESJs **************
// ********** Code for WebKitAnimationJs **************
// ********** Code for WebKitAnimationEventJs **************
// ********** Code for WebKitAnimationListJs **************
// ********** Code for WebKitBlobBuilderJs **************
// ********** Code for WebKitCSSFilterValueJs **************
// ********** Code for WebKitCSSKeyframeRuleJs **************
// ********** Code for WebKitCSSKeyframesRuleJs **************
// ********** Code for WebKitCSSMatrixJs **************
// ********** Code for WebKitCSSTransformValueJs **************
// ********** Code for WebKitMutationObserverJs **************
// ********** Code for WebKitNamedFlowJs **************
// ********** Code for WebKitPointJs **************
// ********** Code for WebKitTransitionEventJs **************
// ********** Code for WebSocketJs **************
// ********** Code for WheelEventJs **************
// ********** Code for WorkerJs **************
// ********** Code for WorkerLocationJs **************
// ********** Code for WorkerNavigatorJs **************
// ********** Code for XMLHttpRequestJs **************
// ********** Code for XMLHttpRequestExceptionJs **************
// ********** Code for XMLHttpRequestProgressEventJs **************
// ********** Code for XMLHttpRequestUploadJs **************
// ********** Code for XMLSerializerJs **************
// ********** Code for XPathEvaluatorJs **************
// ********** Code for XPathExceptionJs **************
// ********** Code for XPathExpressionJs **************
// ********** Code for XPathNSResolverJs **************
// ********** Code for XPathResultJs **************
// ********** Code for XSLTProcessorJs **************
// ********** Code for _Collections **************
function _Collections() {}
// ********** Code for _AudioContextFactoryProvider **************
function _AudioContextFactoryProvider() {}
// ********** Code for _FileReaderFactoryProvider **************
function _FileReaderFactoryProvider() {}
// ********** Code for _TypedArrayFactoryProvider **************
function _TypedArrayFactoryProvider() {}
// ********** Code for _WebKitCSSMatrixFactoryProvider **************
function _WebKitCSSMatrixFactoryProvider() {}
// ********** Code for _WebKitPointFactoryProvider **************
function _WebKitPointFactoryProvider() {}
// ********** Code for _WebSocketFactoryProvider **************
function _WebSocketFactoryProvider() {}
// ********** Code for _XMLHttpRequestFactoryProvider **************
function _XMLHttpRequestFactoryProvider() {}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  return this._array.$index(this._pos++);
}
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._length > this._pos;
}
// ********** Code for _VariableSizeListIterator_dom_Node **************
$inherits(_VariableSizeListIterator_dom_Node, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_Node(array) {
  this._array = array;
  this._pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_Node **************
$inherits(_FixedSizeListIterator_dom_Node, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_Node(array) {
  this._length = array.get$length();
  _VariableSizeListIterator_dom_Node.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dart_core_String **************
$inherits(_VariableSizeListIterator_dart_core_String, _VariableSizeListIterator);
function _VariableSizeListIterator_dart_core_String(array) {
  this._array = array;
  this._pos = (0);
}
// ********** Code for _FixedSizeListIterator_dart_core_String **************
$inherits(_FixedSizeListIterator_dart_core_String, _FixedSizeListIterator);
function _FixedSizeListIterator_dart_core_String(array) {
  this._length = array.get$length();
  _VariableSizeListIterator_dart_core_String.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dom_StyleSheet **************
$inherits(_VariableSizeListIterator_dom_StyleSheet, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_StyleSheet(array) {
  this._array = array;
  this._pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_StyleSheet **************
$inherits(_FixedSizeListIterator_dom_StyleSheet, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_StyleSheet(array) {
  this._length = array.get$length();
  _VariableSizeListIterator_dom_StyleSheet.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dom_Touch **************
$inherits(_VariableSizeListIterator_dom_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_Touch(array) {
  this._array = array;
  this._pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_Touch **************
$inherits(_FixedSizeListIterator_dom_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_Touch(array) {
  this._length = array.get$length();
  _VariableSizeListIterator_dom_Touch.call(this, array);
}
// ********** Code for _VariableSizeListIterator_int **************
$inherits(_VariableSizeListIterator_int, _VariableSizeListIterator);
function _VariableSizeListIterator_int(array) {
  this._array = array;
  this._pos = (0);
}
// ********** Code for _FixedSizeListIterator_int **************
$inherits(_FixedSizeListIterator_int, _FixedSizeListIterator);
function _FixedSizeListIterator_int(array) {
  this._length = array.get$length();
  _VariableSizeListIterator_int.call(this, array);
}
// ********** Code for _VariableSizeListIterator_num **************
$inherits(_VariableSizeListIterator_num, _VariableSizeListIterator);
function _VariableSizeListIterator_num(array) {
  this._array = array;
  this._pos = (0);
}
// ********** Code for _FixedSizeListIterator_num **************
$inherits(_FixedSizeListIterator_num, _FixedSizeListIterator);
function _FixedSizeListIterator_num(array) {
  this._length = array.get$length();
  _VariableSizeListIterator_num.call(this, array);
}
// ********** Code for _Lists **************
function _Lists() {}
// ********** Code for top level **************
function get$window() {
  return window;
}
function get$document() {
  return window.document;
}
//  ********** Library GameOfLife **************
// ********** Code for GameOfLife **************
function GameOfLife() {
  var $this = this; // closure support
  this.shapeName = "Small Exploder";
  this.rowSize = (50);
  this.iterations = (500);
  this.drawSpeed = (110);
  this.colSize = (50);
  this.spacing = (10);
  this.running = false;
  this.drawSpeedInput = get$document().getElementById("drawSpeedInput");
  this.drawSpeedInput.noSuchMethod("set:onchange", [(function (e) {
    $this.drawSpeed = $this.drawSpeedInput.get$valueAsNumber();
  })
  ]);
  this.iterationsInput = get$document().getElementById("iterationsInput");
  this.iterations = this.iterationsInput.get$valueAsNumber();
  this.selectButton = get$document().getElementById("dropDownList");
  var shapeCollection = new ShapeCollection();
  var $$list = shapeCollection.COLLECTION.getKeys();
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var s = $$i.next();
    var o = get$document().createElement("option");
    o.set$innerHTML(s);
    o.set$value(s);
    this.selectButton.appendChild(o);
  }
  this.selectButton.noSuchMethod("set:onchange", [(function (e) {
    $this.shapeName = $this.selectButton.get$options().item($this.selectButton.get$selectedIndex()).get$textContent();
    loadShape($this.shapeName, $this.g);
    $this.printCanvas($this.canvasRenderingContext2D, $this.g, $this.spacing);
  })
  ]);
  this.stopStartButton = get$document().getElementById("StopStart");
  this.stopStartButton.set$innerHTML("Start");
  this.stopStartButton.noSuchMethod("set:onclick", [(function (e) {
    if ($this.running) {
      get$window().clearInterval($this.intervalId);
      $this.stopStartButton.set$innerHTML("Start");
      $this.nextButton.set$disabled(false);
      $this.iterationsInput.set$disabled(false);
      $this.drawSpeedInput.set$disabled(false);
      $this.selectButton.set$disabled(false);
    }
    else {
      $this.stopStartButton.set$innerHTML("Stop");
      $this.nextButton.set$disabled(true);
      $this.iterationsInput.set$disabled(true);
      $this.drawSpeedInput.set$disabled(true);
      $this.selectButton.set$disabled(true);
      $this.iterations = $this.iterationsInput.get$valueAsNumber();
      $this.intervalId = get$window().setInterval($wrap_call$0(function f() {
        $this.iterations = $sub($this.iterations, (1));
        $this.iterationsInput.set$valueAsNumber($this.iterations);
        $this.g.next();
        $this.printCanvas($this.canvasRenderingContext2D, $this.g, $this.spacing);
        if ($lte($this.iterations, (0))) {
          get$window().clearInterval($this.intervalId);
        }
      }
      ), $this.drawSpeed);
    }
    $this.running = !$this.running;
  })
  ]);
  this.nextButton = get$document().getElementById("Next");
  this.nextButton.noSuchMethod("set:onclick", [(function (e) {
    if (!$this.running && $gte($this.iterations, (0))) {
      $this.iterations = $sub($this.iterations, (1));
      $this.iterationsInput.set$valueAsNumber($this.iterations);
      $this.g.next();
      $this.printCanvas($this.canvasRenderingContext2D, $this.g, $this.spacing);
    }
  })
  ]);
}
GameOfLife.prototype.run = function() {
  this.canvasElement = get$document().getElementById("lifeCanvas");
  this.canvasRenderingContext2D = this.canvasElement.getContext("2d");
  this.g = new GameOfLifeGrid(this.colSize, this.rowSize);
  this.selectButton.set$selectedIndex((1));
  loadShape(this.shapeName, this.g);
  this.printCanvas(this.canvasRenderingContext2D, this.g, this.spacing);
}
GameOfLife.prototype.printCanvas = function(canvasRenderingContext2D, g, spacing) {
  canvasRenderingContext2D.set$lineWidth((1));
  canvasRenderingContext2D.set$lineCap("round");
  canvasRenderingContext2D.setStrokeColor("rgb(51, 255, 51)");
  canvasRenderingContext2D.fill();
  for (var c = (0);
   c < g.grid.get$length(); c++) {
    for (var r = (0);
     r < g.grid.$index(c).get$length(); r++) {
      var printCellLocation = g.grid.$index(c).$index(r);
      if (g.currentShape.containsKey(printCellLocation)) {
        canvasRenderingContext2D.setFillColor("rgba(187, 255, 255,0.9)");
        canvasRenderingContext2D.fillRect(c * spacing, r * spacing, (9), (9));
      }
      else {
        canvasRenderingContext2D.clearRect(c * spacing, r * spacing, (10), (10));
        canvasRenderingContext2D.strokeRect(c * spacing, r * spacing, (10), (10));
      }
    }
  }
}
// ********** Code for Cell **************
function Cell(col, row) {
  this.neighbour = (0);
  this.col = col;
  this.row = row;
  this.HASHFACTOR = (5000);
}
Cell.prototype.hashCode = function() {
  return $mul(this.HASHFACTOR, this.row) + this.col;
}
Cell.prototype.toString = function() {
  return $add($add($add($add("Cell at (" + this.col, ", ") + this.row, ") with ") + this.neighbour, " neighbour"), (this.neighbour == (1) ? "" : "s"));
}
// ********** Code for Dimension **************
function Dimension(height, width) {
  this.width = width;
  this.height = height;
}
// ********** Code for Shape **************
function Shape(name, shape) {
  this.shape = shape;
  this.name = name;
}
Shape.prototype.getDimension = function() {
  var shapeWidth = (0);
  var shapeHeight = (0);
  for (var cell = (0);
   cell < this.shape.get$length(); cell++) {
    if ($gt(this.shape.$index(cell).$index((0)), shapeWidth)) shapeWidth = this.shape.$index(cell).$index((0));
    if ($gt(this.shape.$index(cell).$index((1)), shapeHeight)) shapeHeight = this.shape.$index(cell).$index((1));
  }
  shapeWidth = $add(shapeWidth, (1));
  shapeHeight = $add(shapeHeight, (1));
  return new Dimension(shapeWidth, shapeHeight);
}
Shape.prototype.toString = function() {
  return $add($add($add($add(this.name, " (") + this.shape.get$length(), " cell"), (this.shape.get$length() == (1) ? "" : "s")), ")");
}
// ********** Code for ShapeCollection **************
function ShapeCollection() {
  this.CLEAR = new Shape("Clear", new Array());
  this.GLIDER = new Shape("Glider", [[(1), (0)], [(2), (1)], [(2), (2)], [(1), (2)], [(0), (2)]]);
  this.SMALLEXPL = new Shape("Small Exploder", [[(0), (1)], [(0), (2)], [(1), (0)], [(1), (1)], [(1), (3)], [(2), (1)], [(2), (2)]]);
  this.EXPLODER = new Shape("Exploder", [[(0), (0)], [(0), (1)], [(0), (2)], [(0), (3)], [(0), (4)], [(2), (0)], [(2), (4)], [(4), (0)], [(4), (1)], [(4), (2)], [(4), (3)], [(4), (4)]]);
  this.CELL10 = new Shape("10 Cell Row", [[(0), (0)], [(1), (0)], [(2), (0)], [(3), (0)], [(4), (0)], [(5), (0)], [(6), (0)], [(7), (0)], [(8), (0)], [(9), (0)]]);
  this.FISH = new Shape("Lightweight spaceship", [[(0), (1)], [(0), (3)], [(1), (0)], [(2), (0)], [(3), (0)], [(3), (3)], [(4), (0)], [(4), (1)], [(4), (2)]]);
  this.PUMP = new Shape("Tumbler", [[(0), (3)], [(0), (4)], [(0), (5)], [(1), (0)], [(1), (1)], [(1), (5)], [(2), (0)], [(2), (1)], [(2), (2)], [(2), (3)], [(2), (4)], [(4), (0)], [(4), (1)], [(4), (2)], [(4), (3)], [(4), (4)], [(5), (0)], [(5), (1)], [(5), (5)], [(6), (3)], [(6), (4)], [(6), (5)]]);
  this.SHOOTER = new Shape("Gosper Glider Gun", [[(0), (2)], [(0), (3)], [(1), (2)], [(1), (3)], [(8), (3)], [(8), (4)], [(9), (2)], [(9), (4)], [(10), (2)], [(10), (3)], [(16), (4)], [(16), (5)], [(16), (6)], [(17), (4)], [(18), (5)], [(22), (1)], [(22), (2)], [(23), (0)], [(23), (2)], [(24), (0)], [(24), (1)], [(24), (12)], [(24), (13)], [(25), (12)], [(25), (14)], [(26), (12)], [(34), (0)], [(34), (1)], [(35), (0)], [(35), (1)], [(35), (7)], [(35), (8)], [(35), (9)], [(36), (7)], [(37), (8)]]);
  this.COLLECTION = _map(["Glider", this.GLIDER, "Small Exploder", this.SMALLEXPL, "Exploder", this.EXPLODER, "10 Cell Row", this.CELL10, "Lightweight spaceship", this.FISH, "Tumbler", this.PUMP, "Gosper Glider Gun", this.SHOOTER, "Clear", this.CLEAR]);
}
ShapeCollection.prototype.getShapeByName = function(name) {
  return this.COLLECTION.$index(name);
}
// ********** Code for GameOfLifeGrid **************
function GameOfLifeGrid(cellCols, cellRows) {
  this.cellCols = cellCols;
  this.cellRows = cellRows;
  this.generations = (0);
  this.currentShape = new HashMapImplementation_Cell$Cell();
  this.nextShape = new HashMapImplementation_Cell$Cell();
  this.grid = new Array(this.cellCols);
  for (var i = (0);
   i < this.grid.get$length(); i++) {
    this.grid.$setindex(i, new Array(this.cellRows));
  }
  for (var c = (0);
   c < this.cellCols; c++) {
    for (var r = (0);
     r < this.cellRows; r++) {
      this.grid.$index(c).$setindex(r, new Cell(c, r));
    }
  }
}
GameOfLifeGrid.prototype.setCell = function(col, row, c) {
  try {
    var cell = this.grid.$index(col).$index(row);
    if (c) {
      this.currentShape.$setindex(cell, cell);
    }
    else {
      this.currentShape.remove(cell);
    }
  } catch (e) {
    e = _toDartException(e);
    if (!(e && e.is$Exception())) throw e;
  }
}
GameOfLifeGrid.prototype.getDimension = function() {
  return new Dimension(this.cellCols, this.cellRows);
}
GameOfLifeGrid.prototype.clear = function() {
  this.generations = (0);
  this.currentShape.clear();
  this.nextShape.clear();
}
GameOfLifeGrid.prototype.addNeighbour = function(col, row) {
  try {
    var cell = this.nextShape.$index(this.grid.$index(col).$index(row));
    if (cell == null) {
      var c = this.grid.$index(col).$index(row);
      c.neighbour = (1);
      this.nextShape.$setindex(c, c);
    }
    else {
      cell.neighbour = cell.neighbour + (1);
    }
  } catch (e) {
    e = _toDartException(e);
    if (!(e && e.is$Exception())) throw e;
  }
}
GameOfLifeGrid.prototype.next = function() {
  var tmpCells;
  this.generations++;
  this.nextShape.clear();
  tmpCells = this.currentShape.getKeys();
  for (var $$i = tmpCells.iterator(); $$i.hasNext(); ) {
    var c = $$i.next();
    c.neighbour = (0);
  }
  tmpCells = this.currentShape.getKeys();
  for (var $$i = tmpCells.iterator(); $$i.hasNext(); ) {
    var cell = $$i.next();
    var col = cell.col;
    var row = cell.row;
    this.addNeighbour(col - (1), row - (1));
    this.addNeighbour(col, row - (1));
    this.addNeighbour(col + (1), row - (1));
    this.addNeighbour(col - (1), row);
    this.addNeighbour(col + (1), row);
    this.addNeighbour(col - (1), row + (1));
    this.addNeighbour(col, row + (1));
    this.addNeighbour(col + (1), row + (1));
  }
  tmpCells = this.currentShape.getKeys();
  for (var $$i = tmpCells.iterator(); $$i.hasNext(); ) {
    var cell = $$i.next();
    if (cell.neighbour != (3) && cell.neighbour != (2)) {
      this.currentShape.remove(cell);
    }
  }
  tmpCells = this.nextShape.getKeys();
  for (var $$i = tmpCells.iterator(); $$i.hasNext(); ) {
    var cell = $$i.next();
    if (cell.neighbour == (3)) {
      this.setCell(cell.col, cell.row, true);
    }
  }
}
// ********** Code for top level **************
function main() {
  new GameOfLife().run();
}
function loadShape(name, g) {
  var dimShape;
  var dimGrid;
  var shapeCollection = new ShapeCollection();
  g.clear();
  var shape = shapeCollection.getShapeByName(name);
  dimShape = shape.getDimension();
  dimGrid = g.getDimension();
  var xOffset = ((dimGrid.width - dimShape.width) / (2)).toInt();
  var yOffset = ((dimGrid.height - dimShape.height) / (2)).toInt();
  var $$list = shape.shape;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var s = $$i.next();
    g.setCell(xOffset + s.$index((0)), yOffset + s.$index((1)), true);
  }
}
// 37 dynamic types.
// 196 types
// 16 !leaf
(function(){
  var v0/*HTMLInputElement*/ = 'HTMLInputElement|HTMLIsIndexElement';
  var v1/*HTMLElement*/ = [v0/*HTMLInputElement*/,'HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLAudioElement|HTMLVideoElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement'].join('|');
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['AudioParam', 'AudioParam|AudioGain']
    , ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLPropertiesCollection']
    , ['HTMLInputElement', v0/*HTMLInputElement*/]
    , ['HTMLElement', v1/*HTMLElement*/]
    , ['Node', [v1/*HTMLElement*/,'Node|Attr|CharacterData|Comment|Text|CDATASection|Document|HTMLDocument|SVGDocument|DocumentFragment|DocumentType|Element|SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement|SVGCircleElement|SVGClipPathElement|SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTextContentElement|SVGTextPathElement|SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement|Entity|EntityReference|Notation|ProcessingInstruction'].join('|')]
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
}
var const$0000 = Object.create(EmptyQueueException.prototype, {});
var const$0001 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0002 = Object.create(NoMoreElementsException.prototype, {});
$static_init();
main();
