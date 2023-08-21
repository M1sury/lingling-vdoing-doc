## ArrayList

### 简介

`ArrayList`的底层是Object[].相比于 Java 的普通数组,它的数组可以动态增长.在添加大量元素前,可以通过`ensureCapacity`来增加容量

#### ArrayLiist可以添加`null`值吗?`

`ArrayList`可以存储`Null`,只是不建议,我们平时在开发过程中很少将 null 值存储到 List 中,因为无意义,而且也会因为忘记做判空处理导致空指针异常

```java
public static void main(String[] args) {
  List<String> list = new ArrayList<>();
  list.add(null);
  list.add("demo");
  // 输出:null
  //dēmo	
  list.forEach(System.out::println);
}
```

### ArrayList与 LinkedList的区别

* 是否保证线程安全: `ArrayList`和`LinkedList`都不能保证线程安全
* 底层数据结构: `ArrayList`底层使用`Object[]`, `LinkedList`底层使用的是**双向链表**
* 是否支持快速随机访问: `LinkedList`不支持高效的随机访问,而`ArrayList`实现了`RandomAccess`接口,是支持快速的随机访问的
* 内存占用: **ArrayList** 的空间浪费体现在会预留出一定的容量空间,因为确保空间是否可用,避免反复扩容. 而**LinkedList**的空间花费在存储的每一个元素上.因为是链表,每个元素需要知道它的前一个元素和后一个元素的地址以及存储的数据

### ArrayList 核心源码解析

#### 基础属性与对象创建源码分析

```java
   /**
     * 默认初始容量大小
     */
    private static final int DEFAULT_CAPACITY = 10;


    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    /**
     *默认构造函数，使用初始容量10构造一个空列表(无参数构造)
     */
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }

    /**
     * 带初始容量参数的构造函数。（用户自己指定容量）
     */
    public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {//初始容量大于0
            //创建initialCapacity大小的数组
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {//初始容量等于0
            //创建空数组
            this.elementData = EMPTY_ELEMENTDATA;
        } else {//初始容量小于0，抛出异常
            throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        }
    }


   /**
    *构造包含指定collection元素的列表，这些元素利用该集合的迭代器按顺序返回
    *如果指定的集合为null，throws NullPointerException。
    */
     public ArrayList(Collection<? extends E> c) {
        elementData = c.toArray();
        if ((size = elementData.length) != 0) {
            // c.toArray might (incorrectly) not return Object[] (see 6260652)
            if (elementData.getClass() != Object[].class)
                elementData = Arrays.copyOf(elementData, size, Object[].class);
        } else {
            // replace with empty array.
            this.elementData = EMPTY_ELEMENTDATA;
        }
    }
```

从上面源码中可以看到以无参构造创建的`ArrayList`,数组容量只有10,在实际开发过程中,如果可以大致确定需要存储多少容量,可以直接指定容量,避免`ArrayList`过多进行自动的扩容导致性能下降.



#### ArrayList扩容源码分析

除了创建`ArrayList`的内容比较重要,还有一块比较重要的部分就是数组在容量不足时的判断与扩容.在什么情况下会扩容,扩容的策略是什么样的? 先从`add`方法开始:

```java
/**
	* ArrayList 添加方法
*/
public boolean add(E e) {
  // 从方法名可以看出来,是为了确保ArrayList内部的Object数组长度是否够用
  // size是当前Object数组中有多少元素,然后+1
  ensureCapacityInternal(size + 1); 
  elementData[size++] = e;
  return true;
}

// minCapacity: 从参数名看出意思应该是当前数组至少要minCapacity
// 的容量才能装下所有的元素
private void ensureCapacityInternal(int minCapacity) {
  // calculateCapacity方法是在计算至少需要多少容量
  ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}

private static int calculateCapacity(Object[] elementData, int minCapacity) {
  // DEFAULT_EMPTY 是一个空的数组,因为使用无参构造创建的ArrayList,在未添加元素前就是使用的空的数组
  if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
    return Math.max(DEFAULT_CAPACITY, minCapacity);
  }
  return minCapacity;
}

private void ensureExplicitCapacity(int minCapacity) {
  // 修改次数增加
  modCount++;

  // 如果最小扩容量 比 当前容量 大,需要扩容
  // overflow-conscious code
  if (minCapacity - elementData.length > 0)
    grow(minCapacity);
}
```

这里需要分析一下:

1、第一种情况: 使用无参构造创建了一个新的ArrayList, 数组是空的,`elementData.length`是 0,minCapacity则是`DEFAULT_CAPACITY = 10`, `10 - 0 > 0`成立,所以需要进行扩容

2、第二种情况:当添加第二个元素时,minCapacity 是 2,,element.length 是 10, `2 - 10 > 0`不成立,所以不需要进行扩容



```java
// ArrayList可以存储的最大的数组容量
private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

private void grow(int minCapacity) {
  // 获取旧容量
  int oldCapacity = elementData.length;
  // 计算新容量,旧容量右移一位,相当于是除以2
  // 新容量相当于是旧容量的1.5倍
  int newCapacity = oldCapacity + (oldCapacity >> 1);
  // 如果新容量比最小扩容量还小,那就只能以最小扩容量作为新容量,这种情况用于无参构造ArrayList刚创建,添加第一个元素的情况
  if (newCapacity - minCapacity < 0)
    newCapacity = minCapacity;
  // 如果新容量大于数组最大容量
  if (newCapacity - MAX_ARRAY_SIZE > 0)
    newCapacity = hugeCapacity(minCapacity);
  // minCapacity is usually close to size, so this is a win:
  elementData = Arrays.copyOf(elementData, newCapacity);
}

private static int hugeCapacity(int minCapacity) {
        if (minCapacity < 0) // overflow
            throw new OutOfMemoryError();
  			// 如果 minCapacity 大,将 Integer 的最大值作为新数组的大小
 				// 如果 MAX_ARRAY_SIZE 大,新容量就是 MAX_ARRAY_SIZE
        return (minCapacity > MAX_ARRAY_SIZE) ?
            Integer.MAX_VALUE :
            MAX_ARRAY_SIZE;
    }
```

![image-20230821210441924](https://cdn.misury.top/blog/image-20230821210441924.png)

而在扩容方法的最后使用了`Arrays.copyOf`方法,来将原数组的元素复制到新数组中

### 参考

* [ArrayList 源码分析 | JavaGuide(Java面试 + 学习指南)](https://javaguide.cn/java/collection/arraylist-source-code.html)