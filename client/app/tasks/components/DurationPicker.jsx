'use client'
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const DurationPicker = ({ initialHours = 0, initialMinutes = 0, onChange }) => {
    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);

    const handleHoursChange = (e) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setHours(value);
        if (onChange) onChange({ hours: value, minutes });
    };

    const handleMinutesChange = (e) => {
        let value = parseInt(e.target.value) || 0;

        // Adjust overflow minutes into hours
        if (value >= 60) {
            const extraHours = Math.floor(value / 60);
            value = value % 60;
            setHours((prev) => {
                const newHours = prev + extraHours;
                if (onChange) onChange({ hours: newHours, minutes: value });
                return newHours;
            });
        } else {
            setMinutes(value);
            if (onChange) onChange({ hours, minutes: value });
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Input
                type="number"
                value={hours}
                onChange={handleHoursChange}
                min="0"
                style={{
                    width: '3rem',
                    textAlign: 'center',
                    borderRadius: '4px',
                    padding: '0.5rem',
                }}
                className='border-none text-gray-500'
            />
            <span>h</span>
            <Input
                type="number"
                value={minutes}
                onChange={handleMinutesChange}
                min="0"
                max="59"
                style={{
                    width: '3rem',
                    textAlign: 'center',
                    borderRadius: '4px',
                    padding: '0.5rem',
                }}
                className='border-none text-gray-500'
            />
            <span>m</span>
        </div>
    );
};

export default DurationPicker;
