export default function usePageTitle(title: string) {
  useHead({
    title: `Proji - ${title}`,
  });
}
