import { StateListTypes } from "@/modules/Customer/interface/customer.interface";
import { StateListService } from "@/modules/Customer/services/customer.service";
import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const AutoCompleteInput = ({ errorInput, selectedState, setSelectedState, setTouched }: any) => {
  useEffect(() => {
    handleStatesList();
  }, []);

  const [stateList, setStateList] = useState<StateListTypes[]>([]);

  const handleStatesList = async () => {
    const response: StateListTypes[] = await StateListService();
    setStateList(response);
  };

  const items: StateListTypes[] = stateList;

  const handleOnSelect = (item: StateListTypes): void => {
    setSelectedState(item);
  };

  const handleOnFocus = (): void => {
    setTouched();
    handleStatesList();
  };

  const formatResult = (item: any): JSX.Element => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}> {item.name}</span>
      </>
    );
  };
  return (
    <ReactSearchAutocomplete
      items={items}
      inputSearchString={selectedState ?? ""}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
      fuseOptions={{
        shouldSort: true,
        threshold: 0,
        keys: ["name"],
      }}
      formatResult={formatResult}
      placeholder="Search and select state"
      className={`auto-complete ${errorInput} `}
    />
  );
};

export default AutoCompleteInput;
