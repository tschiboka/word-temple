export type CrosswordBoardResource = {
    id?: number;                             // Id only exists on PUT but not POST
    meta: CrosswordBoardMetaResource;        // Meta data for crossword creation
    cells: Cell[][];                         // Positional data also provided in Cells 
}

export type CrosswordBoardMetaResource = {
    createdBy: string;                       // User ID of the creator
    title: string;                           // Title of the crossword
    description: string;                     // Description of the crossword
    dimensions: BoardDimensions              // Dimensions of the crossword board
    difficulty: number;                      // Difficulty level (1-5)
    isActive: boolean;                       // Whether the crossword is activated by the user default true
    tags: string[];                          // Tags associated theme tag IDs with the crossword like 'animals', 'sports', etc.
    language: string;                        // Language shorthand of the crossword (e.g., 'en', 'fr', 'de')
}

export type CrosswordBoardResponse = CrosswordBoardResource & {
    id: number;                              // Id in DB
    meta: CrosswordBoardMetaResponse;        // Meta data for crossword for PUT
}

export type CrosswordBoardMetaResponse = CrosswordBoardMetaResource & {
    createdAt: string;                       // Date of creation
    updatedAt: string;                       // Date of last update
    version: number;                        // Version of the crossword board that increments on each update
    isVerified: boolean;                     // Whether the crossword is verified against policy violations by admin (banned words or offensive language)
}

export type Cell = {
    rowIndex: number;                        // Row index in the crossword                                
    colIndex: number;                        // Column index in the crossword
    role: 'empty' | 'clue' | 'solution';     // Role of the cell in the crossword (Empty is experimental and should be avoided)
    solution?: string;                       // Solution character for the cell (only for 'solution' role)   
    clueAcross?: Clue;                       // Clue for the cell in the across direction
    clueDown?: Clue;                         // Clue for the cell in the down direction
}


export type Clue = {
    text: string;                            // Clue text
    imageUrl?: string;                       // Optional image URL for the clue    
    textPlacement: CellTextPlacement;        // Placement of the clue text relative to the cell                                               
}

export type CellTextPlacement = 'left' | 'right' | 'top' | 'bottom' | 'center'

export type BoardDimensions = {
    colNumber: number;                       // Number of columns in the crossword (6-8)
    rowNumber: number;                       // Number of rows in the crossword (8-10)
}

export type Option<T> = {
    label: string;
    value: T;
}