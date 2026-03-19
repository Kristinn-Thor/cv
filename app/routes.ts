import {type RouteConfig, index, layout, route} from '@react-router/dev/routes';

export default [
  layout('layouts/navLayout.tsx', [
    index('routes/home.tsx'),
    route('projects', 'routes/projects.tsx'),
    route('skills', 'routes/skills.tsx'),
    route('contact', 'routes/contact.tsx'),
    route('about', 'routes/about.tsx'),
  ]),
  route('games', 'routes/games.tsx'),
  route('ai-assistant', 'routes/aiAssistant.tsx'),
] satisfies RouteConfig;
