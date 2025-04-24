package com.teachtotech.response;

import java.util.List;
import com.teachtotech.model.CrCoursesDetails;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CoursesResponse {
    private String message;
    private String status;
    private List<CrCoursesDetails> coursesList;
    
}
