---
layout: base
title: "Missives"
---

<section id="intro">
I have no taste for either poverty or honest labor,<br />
so thought leadership is the only recourse left me.
</section>

<section id="posts">
  <ul>
    {% for post in site.posts %}
      {% if post.type == 'link' %}
        <li class="post link">
          <h1><a href="{{ post.link }}">{{ post.title }}</a></h1>
          <p class="post-content">{{ post.content | markdownify }}</p>
          <a href="{{ post.url }}">#
          <time datetime="{{ post.date|date:"%Y-%m-%d" }}">
            {{ post.date|date:"%B %d %Y" }}
          </time>
          </a>
        </li>
      {% else %}
        <li class="post">
          <h1><a href="{{ post.url }}">{{ post.title }}</a></h1>
          <p class="post-summary">{{post.summary }}</p>
          <a href="{{ post.url }}">#
          <time datetime="{{ post.date|date:"%Y-%m-%d" }}">
            {{ post.date|date:"%B %d %Y" }}
          </time>
        </a>
        </li>
      {% endif %}
    {% endfor %}
  </ul>
</section>
