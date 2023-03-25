import { Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import EditPackage from "./EditPackage";
import PackageForm from "../package/PackageForm";
import useAuth from "../../hooks/useAuth";

function AllPackage({ showPackage, open, setOpen }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPage, setTotalPage] = useState(1);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEditPackage, setSelectedEditPackage] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState({});
  const [active, setActive] = useState(false);

  const { authenticatedUser } = useAuth();

  useEffect(() => {
    setTotalPage(Math.ceil(showPackage.length / itemsPerPage));
  }, [showPackage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const showPackageModal = (packageId, title) => {
    setOpen(true);
    setSelectedPackageId({ packageId, title });
  };

  const handleItemsPerPageChange = (event) => {
    const value = +event.target.value;
    // console.log(value);
    setItemsPerPage(value);
  };

  const handleOpenEditModal = (packageId) => {
    setOpenEditModal(true);
    setSelectedEditPackage(packageId);
  };

  // const handleSubmitForm = (e) => {
  //   e.preventDefault();
  // };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = showPackage.slice(startIndex, endIndex);

  return (
    <>
      <div className=" w-full ">
        <div className="flex justify-center">
          <div className="grid  grid-cols-2  w-11/12">
            {itemsToDisplay.map((e) => (
              <div
                className=" bg-white rounded-xl w-9/12 h-64 justify-items-stretch space-y-3  drop-shadow-2xl p-6  hover:scale-105 duration-300 mb-4"
                key={e.id}
              >
                <div>
                  <div className="flex justify-between">
                    <h1>Package: {e.title}</h1>
                    {authenticatedUser?.role === "ADMIN" && (
                      <button onClick={() => handleOpenEditModal(e.id)}>
                        <i className="fa-solid fa-wrench"></i>
                      </button>
                    )}
                  </div>
                  <div className="ml-8 pb-10 pt-4 ">
                    <h1>Detail: {e.description}</h1>
                    <h1>Price: {e.price}</h1>
                    <h1>Duration:</h1>
                  </div>
                  <div
                    className={`flex justify-center ${
                      authenticatedUser.role === "ADMIN"
                        ? "bg-sky-600 hover:bg-blue-400"
                        : authenticatedUser.role === "EMPLOYEE"
                        ? "bg-amber-600 hover:bg-amber-400 "
                        : "bg-green-500 hover:bg-green-400"
                    }  rounded-md hover:bg-blue-200 shadow-xl  `}
                  >
                    <button
                      className="w-full h-10 text-white text-xl font-semibold "
                      onClick={() => showPackageModal(e.id, e.title)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-end fixed-bottom pb-3">
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            showIcons={true}
            totalPages={totalPage}
            itemsperpage={itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
        </div>
      </div>
      {openEditModal && selectedEditPackage !== null && (
        <div className="w-10/12">
          <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
            <EditPackage
              selectedEditPackage={selectedEditPackage}
              isActive={active}
              setActive={setActive}
            />
          </Modal>
        </div>
      )}
      {open && selectedPackageId !== null && (
        <Modal setOpen={setOpen} open={open} onClose={() => setOpen(false)}>
          <PackageForm selectedPackageId={selectedPackageId} />
        </Modal>
      )}
    </>
  );
}

export default AllPackage;
