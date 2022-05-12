import React, { useState} from 'react'
import { lecturerData } from '../utils/LecturerData'
import AccordionItem from '../components/AccordionItem'

const LecturerProfile = () => {
    const [clicked, setClicked] = useState("0");

    const handleToggle = (index) => {
      if (clicked === index) {
        return setClicked("0");
      }
      setClicked(index);
    };
  
    return (
        <ul className="accordion">
            {lecturerData.map((data, index) => (
                <AccordionItem
                    onToggle={() => handleToggle(index)}
                    active={clicked === index}
                    key={index}
                    data={data}
                />
            ))}
        </ul>
    )
}

export default LecturerProfile;

