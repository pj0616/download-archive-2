package problems.java.compound;

import java.util.HashMap;
import java.util.Map;

public class LRUCache<K,V>
{
    private static class Node<K, V>
    {
        K key;
        V value;
        Node<K,V> prev;
        Node<K,V> next;

        Node(K key, V value)
        {
            this.key = key;
            this.value = value;
        }
    }



    private int capacity;
    private Map<K, Node<K,V>> map = new HashMap<>();
    private Node<K,V> head;
    private Node<K,V> tail;

    public LRUCache(int capacity)
    {
        this.capacity = capacity;
    }

    public void set(K key, V value)
    {
        if(map.containsKey(key))
        {
            Node<K,V> old = map.get(key);
            old.value = value;
            remove(old);
            setHead(old);
        }
        else
        {
            Node<K,V> node = new Node<>(key, value);
            if(map.size() >= capacity)
            {
                map.remove(tail.key);
                remove(tail);
            }
            setHead(node);
            map.put(key, node);
        }
    }


    public V get(K key)
    {
        if(map.containsKey(key))
        {
            Node<K,V> node = map.get(key);
            remove(node);
            setHead(node);
            return node.value;
        }
        return null;
    }

    private void remove(Node<K,V> node)
    {
        if(node.prev != null)
        {
            node.prev.next = node.next;
        }
        else
        {
            head = node.next;
        }

        if(node.next != null)
        {
            node.next.prev = node.prev;
        }
        else
        {
            tail = node.prev;
        }
    }

    private void setHead(Node<K,V> node)
    {
        node.next = head;
        node.prev = null;

        if(head != null)
        {
            head.prev = node;
        }

        head = node;

        if(tail == null)
        {
            tail = head;
        }
    }

    static boolean testsPass()
    {
        LRUCache<String, Integer> cache = new LRUCache<>(3);
        cache.set("One", 1);
        cache.set("Two", 2);
        cache.set("Three", 3);
        cache.set("Four", 4);
        cache.set("Five", 5);
        cache.set("Six", 6);
        boolean check = cache.get("Four") != null &&
                cache.get("Five") != null && cache.get("Six") != null;
        if(!check)
        {
            return false;
        }
        check = cache.get("One") == null &&
                cache.get("Two") == null && cache.get("Three") == null;
        if(!check)
        {
            return false;
        }
        return true;
    }

    public static void main(String... args)
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }

}
