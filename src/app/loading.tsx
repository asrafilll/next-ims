export default function Loading() {
  return (
    <div className="mt-4 py-28 flex w-full flex-col items-center justify-center text-center rounded-[10px] border border-stroke bg-white bg-[url('/images/NCI/img/bg2.webp')] bg-cover bg-no-repeat">
      <div className="mx-auto flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          width="100"
          height="100"
          style={{ shapeRendering: "auto" }}
        >
          <g>
            {[...Array(12)].map((_, i) => (
              <g transform={`rotate(${i * 30} 50 50)`} key={i}>
                <rect
                  fill="#71a9fe"
                  height="12"
                  width="6"
                  ry="6"
                  rx="3"
                  y="24"
                  x="47"
                >
                  <animate
                    repeatCount="indefinite"
                    begin={`-${(11 - i) * (1 / 12)}s`}
                    dur="1s"
                    keyTimes="0;1"
                    values="1;0"
                    attributeName="opacity"
                  ></animate>
                </rect>
              </g>
            ))}
          </g>
        </svg>
        <p className="mt-2 text-center">Loading...</p>
      </div>
    </div>
  );
}
