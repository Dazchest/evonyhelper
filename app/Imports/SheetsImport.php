<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class SheetsImport implements ToCollection
{
    // /**
    //  * @return array
    //  */
    //  public function sheets(): array
    //  {
    //      return [
    //          0 => $this,
    //      ];
    //  }
 
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        //
        return $collection;
    }
}
