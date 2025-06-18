import { useState, useEffect, useCallback, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import colors from './Json/colors.json';
import '../App.css';

const Subsection = ({ data, onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const [hoveredTags, setHoveredTags] = useState(false);
    const [hoveredTeam, setHoveredTeam] = useState(false);

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

    // Function to render tags with "+X more" if more than 3
    const renderTags = () => {
        const maxVisible = 3;
        if (data.tags.length <= maxVisible) {
            return data.tags.map((val, keys) => (
                <span
                    key={keys}
                    className={val}
                    style={{ backgroundColor: getUniqueColor(keys) }}
                >
                    {val}
                </span>
            ));
        }

        const visibleTags = data.tags.slice(0, maxVisible);
        const remainingTags = data.tags.slice(maxVisible);
        const remainingCount = remainingTags.length;

        return (
            <>
                {visibleTags.map((val, keys) => (
                    <span
                        key={keys}
                        className={val}
                        style={{ backgroundColor: getUniqueColor(keys) }}>
                        {val}
                    </span>
                ))}
                <span 
                    className="more-tags" 
                    style={{ backgroundColor: '#eee', color: '#333' }}
                    onMouseEnter={() => setHoveredTags(true)}
                    onMouseLeave={() => setHoveredTags(false)}>
                    +{remainingCount} more
                    {hoveredTags && (
                        <div className="tags-tooltip">
                            {remainingTags.map((tag, index) => (
                                <div 
                                    key={`remaining-tag-${index}`}
                                    style={{ backgroundColor: getUniqueColor(maxVisible + index) }}
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}
                </span>
            </>
        );
    };

    // Function to render team members with "+X more" if more than 3
    const renderTeam = () => {
        const maxVisible = 2;
        if (data.team.length <= maxVisible) {
            return data.team.map((val, keys) => (
                <span key={keys}>{val}</span>
            ));
        }

        const visibleTeam = data.team.slice(0, maxVisible);
        const remainingTeam = data.team.slice(maxVisible);
        const remainingCount = remainingTeam.length;

        return (
            <>
                {visibleTeam.map((val, keys) => (
                    <span key={keys}>{val}</span>
                ))}
                <span 
                    className="more-team" 
                    style={{ backgroundColor: '#eee', color: '#333' }}
                    onMouseEnter={() => setHoveredTeam(true)}
                    onMouseLeave={() => setHoveredTeam(false)}>
                    +{remainingCount} more
                    {hoveredTeam && (
                        <div className="team-tooltip">
                            {remainingTeam.map((member, index) => (
                                <div key={`remaining-member-${index}`}>
                                    {member}
                                </div>
                            ))}
                        </div>
                    )}
                </span>
            </>
        );
    };

    return (
        <div className="midBanner">
            <div className='container_left'>
                <table>
                    <tbody>
                        <tr>
                            <th>Priority : </th>
                            <td><span className={'tfcs ' + data.priority}>{data.priority}</span></td>
                        </tr>
                        <tr>
                            <th>Due Date : </th>
                            <td className='dt_org'>{data.duedate}</td>
                        </tr>
                        <tr>
                            <th>Tags : </th>
                            <td className="tags">
                                {renderTags()}
                            </td>
                        </tr>
                        <tr>
                            <th>Assignees : </th>
                            <td className="assignees">
                                {renderTeam()}
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