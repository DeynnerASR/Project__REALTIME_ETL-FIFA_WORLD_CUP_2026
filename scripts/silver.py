import pandas as pd
from pathlib import Path


def transform_matches():
    path = Path(__file__).parent.parent / "data" / "bronze"
    files = list(path.glob("match_*.json"))

    
    df = pd.read_json(files[0])

    df_partidos = df[["match_number","round","group_name","home_team","home_team_code","away_team","away_team_code","home_score","away_score"]]
    df_partidos = df_partidos.rename(
        columns={'match_number': 'numero_partido', 
                 'round': 'ronda',
                 'group_name': 'grupo', 
                 'home_team_code': 'codigo_equipo_local', 
                 'away_team_code': 'codigo_equipo_visitante',
                 'home_score': 'marcador_local',
                 'away_score': 'marcador_visitante',
                 'home_team': 'equipo_local',
                 'away_team': 'equipo_visitante'             
                })

    print(df_partidos)
    #print(df.columns)
    
transform_matches()