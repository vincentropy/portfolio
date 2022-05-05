# Portfolio - @vincentropy

[![Build](https://github.com/vincentropy/portfolio/actions/workflows/github_pages.yml/badge.svg)](https://github.com/vincentropy/portfolio/actions/workflows/github_pages.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/vincentropy/portfolio/badge)](https://www.codefactor.io/repository/github/vincentropy/portfolio)
[![Maintainability](https://api.codeclimate.com/v1/badges/f9bc59cd3d65ecf496c7/maintainability)](https://codeclimate.com/github/vincentropy/portfolio/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f9bc59cd3d65ecf496c7/test_coverage)](https://codeclimate.com/github/vincentropy/portfolio/test_coverage)

This portfolio showcases recent projects I've been working on.
It's a miniature CMS with content written in markdown and UI in React/MUI.

**[Live version on github pages](https://vincentropy.github.io/portfolio/)**

## Design requirements

I wanted to create with a minimalist but flexible layout design that works on both mobile and desktop and is easy to maintain. To that end, this project

- uses markdown files to store actual content
- uses React and MUI to create a rich responsive UI
- is designed mobile-first
  - vertical card layout
  - minimizes bundle size by loading content only when it is needed.
- statically hosted to minimize maintenance cost

I also decided to experiment with just-in-time loading of components without causing page jitter.

## Stack in this project

- React
- MUI
- github pages
- github CI/CD
- react-markdown
