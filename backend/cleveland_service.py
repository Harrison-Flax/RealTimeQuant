import pandas as pd
# Glob finds patterns in the path names
# Makes identifying paths easier
import glob
import os

def get_cleveland_data(data_dir="data"):
    # Merges all of the CSV files in the data directory
    csv_path = os.path.join(os.getcwd(), data_dir, "*.csv")
    files = glob.glob(csv_path)

    if not files:
        print(f"Warning: No CSV files found in {csv_path}")
        return pd.DataFrame()

    all_data = []
    for file in files:
        try:
            df = pd.read_csv(file)
            # Clean the data for clearer output
            if 'Label' in df.columns and 'CPI Inflation' in df.columns:
                df = df.rename(columns={'Label': 'date', 'CPI Inflation': 'value'})
                all_data.append(df[['date', 'value']])
        except Exception as e:
            print(f"Skipping {file}: {e}")
    
    if all_data:
        final_df = pd.concat(all_data)
        # Simple date format
        final_df['date'] = pd.to_datetime(final_df['date'] + "/2025", format="%m/%d/%Y", errors='coerce')
        return final_df.dropna().sort_values('date')
    
    return pd.DataFrame()