<?php

namespace N1ebieski\IDir\Models\Report\Dir;

use N1ebieski\ICore\Models\Report\Report as BaseReportModel;

class Report extends BaseReportModel
{
    // Accessors

    /**
     * [getPoliAttribute description]
     * @return string [description]
     */
    public function getPoliAttribute() : string
    {
        return 'dir';
    }
}
