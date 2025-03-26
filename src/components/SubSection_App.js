import '../App.css';
import { FaSearch } from 'react-icons/fa';
import colors from './Json/colors.json';
import { useState, useEffect, useCallback, useMemo } from 'react';

const Subsection = ({ data, onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    // Debounced search handler
    const handleSearch = useCallback(() => {
        if (onSearch) {
            onSearch(inputValue);
        }
    }, [inputValue, onSearch]);

    useEffect(() => {
        const timer = setTimeout(handleSearch, 300);
        return () => clearTimeout(timer);
    }, [inputValue, handleSearch]);



    const shuffledColors = useMemo(() => {
        const shuffleArray = (array) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        };
        return shuffleArray([...colors.colors]);
    }, []);

    const getUniqueColor = (index) => {
        return shuffledColors[index % shuffledColors.length];
    };

    return (
        <div className="midBanner">
            <div className='container_left'>
                <table>
                    <tbody>
                        <tr>
                            <th>Priority</th>
                            <td><span className={'tfcs ' + data.priority}>{data.priority}</span></td>
                        </tr>
                        <tr>
                            <th>Due Date</th>
                            <td className='dt_org'>{data.duedate}</td>
                        </tr>
                        <tr>
                            <th>Tags</th>
                            <td className="tags">
                                {data.tags.map((val, keys) => (
                                    <span
                                        key={keys}
                                        className={val}
                                        style={{ backgroundColor: getUniqueColor(keys) }}
                                    >
                                        {val}
                                    </span>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <th>Assignees</th>
                            <td className="assignees">
                                {data.team.map((val, keys) => (
                                    <span key={keys}>{val}</span>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='container_right'>
                <div className='input_area'>
                    <input
                        type='text'
                        placeholder='Search Tasks'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <FaSearch className='incs' />
                </div>
            </div>
        </div>
    );
};

export default Subsection;