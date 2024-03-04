interface Employee {
    id: number;
    name: string;
    img: string;
    jobTitle: {
        id: number;
        name: string;
    };
    organization: {
        img: string;
        name: string;
    };
    children?: Employee[];
}

interface OrganizationChartProps {
    data: Employee[];
}

export default function OrganizationChart({ data }: OrganizationChartProps) {
    const renderEmployee = (employee: Employee): JSX.Element => (
        <div key={employee.id} className="flex flex-col justify-center items-center">
            <div className="w-16">
                <img className="block rounded-full m-auto shadow-md" alt={employee.name} src={employee.img} />
            </div>
            <div className="text-gray-600">
                <p>{employee.name}</p>
                <p>{employee.jobTitle?.name}</p>
            </div>
            {employee.children && (
                <ul className="flex flex-row mt-10 justify-center">
                    {employee.children.map(child => (
                        <li key={child.id} className="relative p-6">
                            <div className="border-t-2 absolute h-8 border-gray-400 top-0" style={{ left: '50%', right: '0px' }}></div>
                            <div className="relative flex justify-center">
                                <div className="-mt-6 border-l-2 absolute h-6 border-gray-400 top-0"></div>
                                {renderEmployee(child)}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl top-0 absolute">Organisation Flow chart</h1>
            <div className="container mx-auto text-center pt-24">
                <div className="items-center justify-center flex">
                    <div className="text-center relative">
                        {data.map(employee => renderEmployee(employee))}
                    </div>
                </div>
            </div>
        </div>
    );
}
