# Lily's World

A fun, customised learning app for Lily. React + Vite, hosted on Vercel.

## Sections

- **Maths** - addition, subtraction, times tables (pick the operation). Streak counter keeps track of correct answers in a row.
- - **Spelling** - picture to word. Three difficulty levels (easy 3-letter words to hard 7-9 letter words).
  - - **Geography** - flag shown, pick the matching country from four options.
    - - **My List** - simple to-do list Lily can add her own bits to.
     
      - All progress is saved in the browser (localStorage) - no login, no server needed.
     
      - ## Tech
     
      - - React 18 + Vite 5
        - - localStorage for persistence
          - - Fonts: Baloo 2 (display), Fredoka (body), Caveat (handwritten accents)
            - - Single stylesheet, no CSS frameworks
             
              - ## Running locally
             
              - ```
                npm install
                npm run dev
                ```

                Then visit http://localhost:5173

                ## Deploying

                Push to `main` on GitHub then Vercel auto-deploys. Same setup as Averie's planner.
                Framework preset: Vite (auto-detected). Build command `npm run build`, output `dist/`.
