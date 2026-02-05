import type { Route } from './+types/management-table._index';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'Online Products Selling App' },
    {
      name: 'description',
      content:
        'Insert a useful description in order to have a good SEO performance',
    },
  ];
}

export default function Home() {
  return (
    <>
      <h1 className="text-2xl">Hello, dashboard!</h1>
    </>
  );
}
