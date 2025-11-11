import React, { useState, useEffect, useCallback } from 'react';
import { TIMEZONES, PRESELECTED_TARGETS } from '../constants';
import { ConversionResult, TimeFormat, TimeZone } from '../types';

const TimeZoneConverterTool: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [sourceTimezone, setSourceTimezone] = useState<string>('America/New_York');
  const [sourceDateTime, setSourceDateTime] = useState('');
  const [targetTimezones, setTargetTimezones] = useState<string[]>(PRESELECTED_TARGETS);
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('12h');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set default time to current user's time on component mount
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setSourceDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
  }, []);

  const handleTargetTimezoneChange = (identifier: string) => {
    setTargetTimezones(prev => 
      prev.includes(identifier) 
        ? prev.filter(tz => tz !== identifier)
        : [...prev, identifier]
    );
  };

  const getCityName = (identifier: string): string => {
    return TIMEZONES.find(tz => tz.identifier === identifier)?.name || identifier;
  }

  // Helper function to get timezone offset in minutes for a specific date.
  // This uses the browser's Intl API for a reliable, network-less calculation.
  // The offset is calculated as: Local Time - UTC Time.
  // e.g., New York (UTC-4) will return -240.
  const getStandardOffsetMinutes = (timeZone: string, date: Date): number => {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
    return (tzDate.getTime() - utcDate.getTime()) / 60000;
  };

  const handleConvert = useCallback(() => {
    if (!sourceDateTime || targetTimezones.length === 0) {
      setError('Please select a source date/time and at least one target city.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      // 1. Parse the local date-time string manually.
      // `new Date(sourceDateTime)` is unreliable as it uses the browser's timezone.
      const parts = sourceDateTime.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/)!;
      if (!parts) {
        throw new Error("Invalid date time format. Please use YYYY-MM-DDTHH:mm.");
      }
      const [, year, month, day, hour, minute] = parts.map(p => parseInt(p, 10));

      // 2. Create a timestamp as if the user's input time was in UTC.
      const timestampAsUTC = Date.UTC(year, month - 1, day, hour, minute);

      // 3. Create a temporary date from this timestamp to calculate the source timezone's offset.
      const tempDate = new Date(timestampAsUTC);
      const sourceOffsetMinutes = getStandardOffsetMinutes(sourceTimezone, tempDate);
      
      // 4. Correct the timestamp. The user's input was in `sourceTimezone`, not UTC.
      // To get the true UTC time, we subtract the source timezone's offset.
      // e.g., 10:00 in NY (offset -240) is 10:00 - (-240m) = 14:00 UTC.
      const correctTimestamp = timestampAsUTC - (sourceOffsetMinutes * 60 * 1000);
      const sourceDate = new Date(correctTimestamp);

      // 5. Now we have the correct moment in time (sourceDate), we can format it for all targets.
      const finalSourceOffsetMinutes = getStandardOffsetMinutes(sourceTimezone, sourceDate);

      const newResults = targetTimezones.map((targetTz) => {
        const targetOffsetMinutes = getStandardOffsetMinutes(targetTz, sourceDate);
        const timeDiffHours = (targetOffsetMinutes - finalSourceOffsetMinutes) / 60;
        const timeDiffString = timeDiffHours === 0 ? 'Same' : (timeDiffHours > 0 ? `+${timeDiffHours}` : `${timeDiffHours}`);
          
        const options: Intl.DateTimeFormatOptions = {
            timeZone: targetTz,
            hour: 'numeric', minute: 'numeric', hour12: timeFormat === '12h',
        };
        const dateOptions: Intl.DateTimeFormatOptions = {
            timeZone: targetTz,
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        };

        return {
            cityName: getCityName(targetTz),
            time: new Intl.DateTimeFormat('en-US', options).format(sourceDate),
            timeDiff: `${timeDiffString} hrs`,
            date: new Intl.DateTimeFormat('en-US', dateOptions).format(sourceDate),
        };
      });

      setResults(newResults);
    } catch (err) {
      console.error('Conversion failed:', err);
      setError('Failed to convert time. Please check the date/time input and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [sourceDateTime, sourceTimezone, targetTimezones, timeFormat]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-slate-900 bg-opacity-50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl shadow-purple-500/20">
        
        {/* Main Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
                <label htmlFor="source-city" className="block text-lg font-semibold mb-2 text-cyan-300">Source City / Time</label>
                <select 
                    id="source-city" 
                    value={sourceTimezone}
                    onChange={(e) => setSourceTimezone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 mb-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                    {TIMEZONES.map(tz => <option key={tz.identifier} value={tz.identifier}>{tz.name}</option>)}
                </select>
                <input
                    type="datetime-local"
                    value={sourceDateTime}
                    onChange={(e) => setSourceDateTime(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
                 <button 
                    onClick={handleConvert}
                    disabled={isLoading}
                    className="w-full md:w-auto font-orbitron text-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Converting...' : 'Convert Time'}
                </button>
                <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-full">
                    <button onClick={() => setTimeFormat('12h')} className={`px-4 py-1 rounded-full text-sm font-semibold ${timeFormat === '12h' ? 'bg-cyan-600 text-white' : 'text-slate-300'}`}>12-hour</button>
                    <button onClick={() => setTimeFormat('24h')} className={`px-4 py-1 rounded-full text-sm font-semibold ${timeFormat === '24h' ? 'bg-cyan-600 text-white' : 'text-slate-300'}`}>24-hour</button>
                </div>
            </div>
        </div>
        
        {/* Target City Selector */}
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-cyan-300">Target Cities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {TIMEZONES.filter(tz => tz.identifier !== 'Etc/UTC').map(tz => (
                    <label key={tz.identifier} className="flex items-center space-x-2 bg-slate-800 p-2 rounded-md cursor-pointer hover:bg-slate-700 transition-colors">
                        <input 
                            type="checkbox" 
                            checked={targetTimezones.includes(tz.identifier)}
                            onChange={() => handleTargetTimezoneChange(tz.identifier)}
                            className="form-checkbox h-5 w-5 rounded bg-slate-700 border-slate-500 text-cyan-500 focus:ring-cyan-600"
                        />
                        <span className="text-sm">{tz.name}</span>
                    </label>
                ))}
            </div>
        </div>
        
        {/* Output Display */}
        <div className="mt-8">
            <h2 className="text-2xl font-bold font-orbitron mb-4 text-center text-purple-300">Conversion Results</h2>
            {error && <div className="text-center text-red-400 p-3 bg-red-900/50 rounded-md">{error}</div>}
            {isLoading && (
                <div className="text-center text-cyan-300">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-300 mx-auto"></div>
                    <p className="mt-2">Calculating interstellar coordinates...</p>
                </div>
            )}
            {!isLoading && results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map(result => (
                        <div key={result.cityName} className="bg-slate-800/70 p-4 rounded-lg border border-slate-700 text-center">
                            <h4 className="text-xl font-bold text-white">{result.cityName}</h4>
                            <p className="text-sm text-purple-300">{result.timeDiff} from source</p>
                            <p className="font-orbitron text-4xl font-bold my-2 text-cyan-300">{result.time}</p>
                            <p className="text-slate-400 text-sm">{result.date}</p>
                        </div>
                    ))}
                </div>
            )}
             {!isLoading && results.length === 0 && !error && (
                <div className="text-center text-slate-500 py-8">
                    <p>Results will appear here once you convert a time.</p>
                </div>
            )}
        </div>

        {/* API Key Section */}
        <div className="mt-6 pt-6 border-t border-slate-800 text-sm text-slate-400 text-center">
          {showApiKeyInput ? (
            <div className="max-w-md mx-auto">
              <label htmlFor="apiKey" className="block text-sm font-medium text-slate-400 mb-1 text-left">Custom API Key</label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your professional API key here"
                className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
               <p className="text-xs text-slate-500 mt-2 text-left">The tool now uses the browser's internal time engine and does not require an API key. This input is for specific, professional services only.</p>
            </div>
          ) : (
            <button 
              onClick={() => setShowApiKeyInput(true)} 
              className="hover:text-cyan-400 transition-colors underline decoration-dotted"
            >
              Using a professional or high-volume API key?
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default TimeZoneConverterTool;