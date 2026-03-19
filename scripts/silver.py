import pandas as pd
from pathlib import Path


def transform_matches():
    path = Path(__file__).parent.parent / "data" / "bronze"
    files = list(path.glob("match_*.json"))

    
    df = pd.read_json(files[0])

    df_partidos = df[["match_number","stadium","stadium_city","stadium_country","round","group_name","home_team","home_team_code","away_team","away_team_code","home_score","away_score"]]
    df_partidos = df_partidos.rename(
        columns={'match_number': 'numero_partido', 
                 'stadium': 'estadio',
                 'stadium_city': 'ciudad_estadio',
                 'stadium_country': 'pais_estadio',
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
    return df_partidos

def return_teams():
    transfromed_matches = transform_matches()
    df_equipos = transfromed_matches[["codigo_equipo_local", "equipo_local"]].drop_duplicates()
    print(df_equipos)


def return_stadiums():
    transfromed_matches = transform_matches()
    df_estadios = transfromed_matches[["estadio", "ciudad_estadio", "pais_estadio"]].drop_duplicates()
    print(df_estadios)


df_teams = return_teams()
df_stadiums = return_stadiums()
df_matches = transform_matches()
