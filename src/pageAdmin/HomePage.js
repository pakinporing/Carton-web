import { ListGroup, Pagination, Progress } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useWarehouse from "../hooks/useWarehouse";
import { useEffect, useState } from "react";
import PopupBox from "../components/popupBox";
import Input from "../components/Input";

export default function HomePage() {
  const { shelfSql } = useWarehouse(true);
  const [section, setSection] = useState(1);
  const [totalSection, setTotalSection] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const [itenPerpage, setItemPerpage] = useState(40);
  const [showBox, setShowBox] = useState(null);

  function updateBackgroundColor(el) {
    return el.isAvailable ? "bg-amber-500" : "bg-amber-400";
  }

  const startIndex = (section - 1) * 40;
  const endIndex = startIndex + 40;
  const itemsToDisplay = shelfSql.slice(startIndex, endIndex);

  const items = shelfSql;
  let count = 0;
  items.forEach((el) => {
    if (el.isAvailable) {
      count++;
    }
  });

  let count2 = 0;
  if (shelfSql) {
    count2 = Object.keys(shelfSql).length;
  }

  const result = (((+count2 - +count) / +count2) * 100).toFixed(1);

  useEffect(() => {
    setTotalSection(Math.ceil(shelfSql.length / 40));

    // shelfSql;
  }, [shelfSql]);

  console.log(shelfSql);

  // useEffect(()=> {
  //   setTotalSection(Math.ceil(showPackage.length / itemsPerPage));
  // },[])

  const handleChangeSection = (event) => {
    const value = +event.target.value;
    setItemPerpage(value);
  };

  const handlePageChange = (page) => {
    setSection(page);
  };

  const showDetailBox = (index) => {
    setShowBox(index);
  };

  const hamdleMouseClick = () => {};
  return (
    <>
      <div className="flex justify-between bg-gradient-to-r bg-white  rounded-l-xl shadow-md w-full">
        <div className="w-full justify-between">
          <div className="flex-row justify-between">
            <div className="flex justify-between my-5">
              <div className="flex ml-5">Warehouse Logistics</div>
            </div>
            <div className="flex flex-col w-[100%]">
              <div className="flex justify-evenly w-[100%]">
                <div className="grid p-5  grid-cols-8 gap-3  w-[100%]">
                  {itemsToDisplay.map((el, index) => (
                    <PopupBox
                      onClick={() => showDetailBox(index)}
                      key={el.id}
                      text={el.id}
                      available={el.isAvailable ? "true" : "false"}
                    >
                      <div
                        className={`text-transparent w-6 h-6 m-2 rounded-sm shadow-xl ${updateBackgroundColor(
                          el
                        )}`}
                      >
                        {el.isAvailable ? "true" : "false"}
                      </div>
                    </PopupBox>
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="flex justify-between mt-10 mx-24 "> */}
            <div className="static">
              <div className=" w-auto justify-center absolute">
                <Pagination
                  currentPage={section}
                  onPageChange={handlePageChange}
                  showIcons={true}
                  totalPages={totalSection}
                  itemsperpage={itenPerpage}
                  onChange={handleChangeSection}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            {/* {shelfSql.map(el) => ( */}
            <div className=" w-[100%] h-96 pr-10 bg-white rounded-md lg:max-w-xl flex-row ">
              <div className="flex justify-between">
                <div className="flex  bg-blue-700 hover:bg-blue-400 m-1 rounded-xl shadow-xl ">
                  <i className=" fa-solid fa-box text-slate-100 text-3xl m-4 "></i>
                </div>
                <span className="flex ml-10 ">Detail: </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-evenly min-h-screen overflow-hidden h-14  ">
          <div className=" w-70 h-70 p-6  bg-blue-700  rounded-xl shadow-md lg:max-w-xl ">
            <CircularProgressbar
              className=" p-7"
              value={result}
              text={`${result}%`}
            ></CircularProgressbar>

            <div className="flex-col justify-between">
              <div className="flex">Total Shelf: {count2}</div>
              <div className="flex">Available Shelf: {count}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
