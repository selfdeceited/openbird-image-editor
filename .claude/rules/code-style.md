### For React Components

- Prefer using Functional Components like `const MyComponent: FC<MyComponentProps> = () => {}` over `function MyComponent(props: MyComponentProps) {}`
- Create the folder named after the component name if both component file and its styled component file exist, e.g.
  - `src/components/MyComponent/MyComponent.tsx`
  - `src/components/MyComponent/MyComponent.styled.tsx`

- The related hooks should also be created in the same folder, only if they are related to the component, e.g. `src/components/MyComponent/useMyComponent.ts`.
If the hook is unrelated to the component, place it in the `src/hooks` folder, e.g.
  - `src/hooks/useGlobalState.ts`

### Other Guidelines

- if the file has `.tsx` extension but it does not use jsx syntax, use '.ts' extension instead.
