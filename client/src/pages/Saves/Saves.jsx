import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Hero from "../../Components/Hero/Hero";
import { storage } from "../../utils/Storage";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import CardLib from "../../Components/Card/CardLib/CardLib";

const Saves = () => {
  const [savedLibs, setSavedLibs] = useState([]);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const foundSaves = JSON.parse(storage.local.get("saves"));
    if (Array.isArray(foundSaves) && foundSaves.length > 0) {
      setSavedLibs(foundSaves);
    }
  }, []);

  const selectLib = ({ target }) => {
    const index = target.getAttribute("data-index");
    const lib = savedLibs[index];
    navigate("/lib", { state: lib });
  };

  const clearSaves = () => {
    setIsClearModalOpen(true);
  };

  const confirmedClearSaves = () => {
    storage.local.set("saves", null);
    setSavedLibs([]);
    setIsClearModalOpen(false);
  };

  return (
    <>
      <Layout
        className={"min-h-screen"}
        hero={<Hero title="Your Saved Ad-Libs" />}
      >
        <div className="max-w-4xl mx-auto pt-4 px-4 flex flex-col gap-2">
          <header className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Your Ad-Libs</h3>
            <button
              onClick={clearSaves}
              className="py-2 px-3 border rounded text-red-800 disabled:cursor-not-allowed"
              tabIndex="0"
              aria-label="Clear all saved ad-libs"
              disabled={savedLibs.length === 0}
            >
              Clear Saves
            </button>
          </header>
          <section className="flex flex-col gap-2">
            {savedLibs.length > 0 ? (
              savedLibs.map((lib, index) => {
                return (
                  <CardLib
                    key={lib.prompt + index}
                    lib={lib}
                    selectLib={selectLib}
                    index={index}
                  />
                );
              })
            ) : (
              <p>You do not have any saved Ad-Libs</p>
            )}
          </section>
        </div>
      </Layout>
      <Modal
        header={"Clear Saves"}
        body={
          "Are you sure you want to clear your saves? There is no way to undo this."
        }
        isOpen={isClearModalOpen}
        setIsOpen={setIsClearModalOpen}
      >
        <div className="flex gap-3 mt-3">
          <button
            className="px-3 py-2 w-20 border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded"
            onClick={confirmedClearSaves}
          >
            Yes
          </button>
          <button
            className="px-3 py-2 w-20 rounded border hover:bg-neutral-100 active:bg-neutral-200"
            onClick={() => setIsClearModalOpen(false)}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Saves;
