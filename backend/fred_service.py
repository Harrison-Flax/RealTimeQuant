import os
import requests
import pandas as pd  
from dotenv import load_dotenv

# Read in .env API keys
load_dotenv()

FRED_BASE_URL = "https://api.stlouisfed.org/fred/series/observations"

def get_fred_series(series_id: str, start_date="2020-01-01"):
    # Fetches a data series from the FRED API
    api_key = os.getenv("FRED_API_KEY")
    if not api_key:
        raise ValueError("FRED_API_KEY not found in .env file")

    parameters = {
        "series_id": series_id,
        "api_key": api_key,
        "file_type": "json",
        "observation_start": start_date,
    }

    # Read in the requests from the URL and parameters
    # Save it to a json file 
    response = requests.get(FRED_BASE_URL, params=parameters)
    response.raise_for_status()
    data = response.json()

    # Need a list of dates and values
    observations = data.get("observations", [])
    df = pd.DataFrame(observations)

    # Assign dates and values to appropriate types
    if not df.empty:
        df = df[['date', 'value']]
        df['value'] = pd.to_numeric(df['value'], errors='coerce')
        df['date'] = pd.to_datetime(df['date'])
        return df
    return pd.DataFrame