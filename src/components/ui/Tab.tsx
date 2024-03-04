interface TabProps {
  activeIndex: number;
  values: string[];
  children: React.ReactNode;
  handleClick: (index: number) => void;
}

interface TabPanelProps {
  activeIndex: number;
  index: number;
  children: React.ReactNode;
}

interface TabItemProps {
  activeIndex: number;
  index: number;
  name: string;
  handleClick: (index: number) => void;
}

function TabItem(props: TabItemProps) {
  const { activeIndex, index, name, handleClick } = props;
  return (
    <li>
      <button
        type="button"
        className={`text-xs px-4 pb-3 ${
          activeIndex === index
            ? `border-b-2 border-serene-500 text-gray-700 font-medium`
            : 'text-gray-500 hover:text-serene-500'
        }`}
        onClick={() => handleClick(index)}
      >
        {name}
      </button>
    </li>
  );
}

export function TabPanel(props: TabPanelProps) {
  const { activeIndex, index, children } = props;
  return (
    <div className={`${activeIndex !== index && `hidden`}`}>{children}</div>
  );
}

export function Tab(props: TabProps) {
  const { activeIndex, values, children, handleClick } = props;
  return (
    <>
      <nav>
        <ul className="flex space-x-4">
          {values.map((item: string, index: number) => (
            <TabItem
              key={item}
              index={index}
              name={item}
              activeIndex={activeIndex}
              handleClick={() => handleClick(index)}
            />
          ))}
        </ul>
      </nav>
      {children}
    </>
  );
}
