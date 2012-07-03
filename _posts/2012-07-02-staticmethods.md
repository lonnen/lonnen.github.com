---
title: "Static methods and inheritance"
layout: post
---

My colleague Peter Bengtsson recently published a [blog post](http://www.peterbe.com/plog/newfound-love-of-staticmethod) about the @staticmethod decorator introduced in Python 2.2. Specifically, he argues that @staticmethod is useful for functions called exclusively from object methods, where a developer may want to change the object's behavior by overriding that static method in a subclass. Take a minute to skim his short post (linked above) and familiarize yourself with the context.

If, like me, you're are not a fan of `@staticmethod` you'd be tempted to define `newlines` as a function outside the class as Peter did in the second example. Naively then, to change the behavior of the subclass you might try:

```
def UNIX_newlines(s):
    return s.replace('\n\r', '\n')

class UNIXPrinter(Printer):

    def printer(self):
        return UNIX_newlines(self.text)

p = UNIXPrinter('\n\r')
assert p.printer() == '\n'
```

Which results in an extra line of code and an extra method over the `@staticmethod` solution. This extra method can be an annoying indirection, and if you have many of these subclasses you might resent the growing number of `*_newlines` variants cluttering up your source tree.

As you write all this clutter, though, you might pick up on the similarity of all that copy-pasta. The differences between these functions boil down to the strings provided as arguments to the `s.replace` method. On examination, the strings start to stand out as strongly tied to the objects using the function and suddenly it becomes apparent: they are actually implicit properties of the object.

It might seem unfair; the example is intentionally simple, and there could be a dozen lines of business logic there instead of a quick one-line replacement. However, I conjecture that any time you see a subclass overriding a static method you are dealing with implicit state that could use some refactoring into the object proper. Something like this:

```
class Printer(object):

    _input_line_ending = '\n'
    _output_line_ending = '\r'

    def __init__(self, text):
        self.text = text

    def printer(self):
        return self.text.replace(self._input_line_ending,
                                 self._output_line_ending)

p = Printer('\n\r')
assert p.printer() == '\r\r'

class UNIXPrinter(Printer):

    _input_line_ending = '\n\r'
    _output_line_ending = '\n'

p = UNIXPrinter('\n\r')
assert p.printer() == '\n'
```

Which represents a three line improvement over the `@staticmethod` version given in the original post. The variable names could be improved, but the structure is explicit and clean. Depending on how often these subclasses are instantiated you could go further pass in the line endings as arguments to the constructor, or create a class factory and use partial application to create the equivalent of the subclasses -- but I'll leave these ideas as an exercise for the reader.

Something still nags me about this example -- with the static method gone it's clear that we're dealing classes having [two methods, one of which is init](http://pyvideo.org/video/880/stop-writing-classes). This is strong evidence that we could rewrite these as functions:

```
def custom_print(text):
    return text.replace('\n', '\r')

def UNIX_print(text):
    return text.replace('\n\r', '\n')

assert custom_print('\n\r') == '\r\r'
assert UNIX_print('\n\r') == '\n'
```

This cuts down the examples to 4 lines of code and increases readability by removing the object abstraction. It still suffers from the copy-pasta problem we had above, which can be overcome with a short factory method:

```
def printer_factory(input_line_ending, output_line_ending):
    return lambda x: x.replace(input_line_ending, output_line_ending)

custom_print = printer_factory('\n', '\r')
UNIX_print = printer_factory('\n\r', '\n')

assert custom_print('\n\r') == '\r\r'
assert UNIX_print('\n\r') == '\n'
```

The more printer's you require, the more this method pays off. The factory method is one-fourth the size of the above base class, and each new printer function is defined in one-third the size of a subclass, with equivalent functionality; which answers Peter's challenge toward the end of the article: "How would you do this neatly without OO?"
