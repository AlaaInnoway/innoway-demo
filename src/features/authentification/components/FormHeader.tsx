interface Props {
  heading?: string;
  paragraph?: string;
}

export default function FormHeader(props: Props) {
  const { heading, paragraph } = props;
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="54"
          viewBox="0 0 161.45 43.493"
        >
          <g
            id="Groupe_13327"
            data-name="Groupe 13327"
            transform="translate(-247.608 -360.396)"
          >
            <g id="Groupe_13218" data-name="Groupe 13218">
              <path
                id="Tracé_23687"
                data-name="Tracé 23687"
                d="M7.9,3.941A13.616,13.616,0,0,0,26.823,22.894l3.932,3.938A19.326,19.326,0,0,1,14.13,30.149,18.568,18.568,0,0,1,5.594,25.2,19.156,19.156,0,0,1,3.966,0Z"
                transform="translate(269.356 360.393) rotate(45)"
                fill="#3f3f3f"
              />
              <path
                id="Tracé_23688"
                data-name="Tracé 23688"
                d="M39.2,121.765l-2.717-2.9,2.717-2.9V109.11l-2.825,3-2.611,2.771L30,118.867l2.761,2.959.407.435,2.892,3.1.1.107.2.219,1.421,1.521L39.2,128.72Z"
                transform="translate(311.552 501.057) rotate(180)"
                fill="#ff851B"
              />
            </g>
            <text
              id="RUNCRM"
              transform="translate(291.058 363.264)"
              fill="#3f3f3f"
              fontSize="20"
              fontFamily="Lato-Regular, Lato"
              letterSpacing="0.25em"
            >
              <tspan x="0" y="20">
                RUN
              </tspan>
              <tspan
                y="20"
                fill="#ff851B"
                fontFamily="Lato-Bold, Lato"
                fontWeight="700"
              >
                CRM
              </tspan>
            </text>
            <text
              id="Unlock_CRM_Fuel_Success"
              data-name="Unlock CRM, Fuel Success"
              transform="translate(292.058 389.264)"
              fill="#3f3f3f"
              fontSize="8"
              fontFamily="Lato-Regular, Lato"
              letterSpacing="0.09em"
            >
              <tspan x="0" y="8">
                Unlock CRM, Fuel Success
              </tspan>
            </text>
          </g>
        </svg>
      </div>
      <h2 className="text-center text-lg font-medium text-gray-700 mt-8">
        {heading}
      </h2>
      <div className="text-center text-xs text-gray-500 mt-2">{paragraph}</div>
    </div>
  );
}
